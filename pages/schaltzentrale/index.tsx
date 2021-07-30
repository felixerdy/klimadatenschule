import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import prisma from './../../lib/prisma';
import { GetServerSideProps } from 'next';
import { Organisation, Role, User } from '@prisma/client';
import SchoolModal from '../../components/Modals/SchoolModal';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const organisations = await prisma.organisation.findMany();
  const users = await prisma.user.findMany();

  return {
    props: { organisations, users }
  };
};

type Props = {
  organisations: Organisation[];
  users: User[];
};

const Schaltzentrale: React.FC<Props> = ({ organisations, users }) => {
  const [session, loading] = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!(session || loading)) {
      router.push('/api/auth/signin');
    }

    // @ts-ignore
    if (session && !loading && session.user?.role !== Role.ADMIN) {
      router.push('/');
    }
  }, [session, loading, router]);

  const [opened, setOpened] = useState(false);

  function closeModal() {
    setOpened(false);
  }

  function openModal() {
    setOpened(true);
  }

  if (!(session || loading)) {
    return <p>Redirecting...</p>;
  }

  if (loading) {
    return (
      <Layout>
        <div className="page">
          <h1 className="text-3xl">🎛 Schaltzentrale</h1>
          <main>Lade...</main>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1 className="text-3xl">🎛 Schaltzentrale</h1>
        <main>
          <h2 className="text-xl">👪 Nutzer*innen</h2>
          {users.map(user => (
            <p key={user.id}>{user.name}</p>
          ))}
          <h2 className="text-xl">🏫 Organisationen</h2>
          {organisations.map(organisation => (
            <p key={organisation.id}>{organisation.name}</p>
          ))}
          <button
            onClick={openModal}
            className="text-blue-800 bg-blue-100 px-4 py-2 mt-2  text-sm font-semibold rounded-lg hover:bg-blue focus:bg-blue focus:outline-none focus:shadow-outline"
          >
            Schule / Organisation hinzufügen
          </button>
          <SchoolModal opened={opened} closeModal={closeModal}></SchoolModal>
        </main>
      </div>
    </Layout>
  );
};

export default Schaltzentrale;
