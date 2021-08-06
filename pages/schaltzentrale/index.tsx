import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import prisma from './../../lib/prisma';
import { GetServerSideProps } from 'next';
import { Organisation, Role, User } from '@prisma/client';
import SchoolModal from '../../components/Modals/SchoolModal';
import UserModal from '../../components/Modals/UserModal';

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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  function closeModal() {
    setSelectedUser(null);
    setOpened(false);
  }

  function openModal(user: User) {
    setSelectedUser(user);
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
          <div className="w-full shadow overflow-scroll sm:overflow-auto border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rolle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                    <td>
                      <button
                        className="m-4 text-nutrition-darkest bg-yellow-100 px-4 py-2 text-sm font-semibold rounded-lg hover:bg-yellow-200 focus:bg-gray focus:outline-none focus:shadow-outline inline-flex items-center"
                        type="button"
                        onClick={() => openModal(user)}
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        <span>Editieren</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* <h2 className="text-xl">🏫 Organisationen</h2>
          {organisations.map(organisation => (
            <p key={organisation.id}>{organisation.name}</p>
          ))}
          <button
            onClick={openModal}
            className="text-blue-800 bg-blue-100 px-4 py-2 mt-2  text-sm font-semibold rounded-lg hover:bg-blue focus:bg-blue focus:outline-none focus:shadow-outline"
          >
            Schule / Organisation hinzufügen
          </button>
          <SchoolModal opened={opened} closeModal={closeModal}></SchoolModal> */}
          {selectedUser && (
            <UserModal
              opened={opened}
              user={selectedUser}
              closeModal={closeModal}
            ></UserModal>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default Schaltzentrale;
