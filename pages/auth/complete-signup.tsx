import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { getSession, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import prisma from './../../lib/prisma';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { toast } from 'react-toastify';
import Button from '../../components/ui/Button';
import UserSchoolModal from '../../components/Modals/UserSchoolModal';
import { Organisation } from '.prisma/client';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const organisations = await prisma.organisation.findMany();

  return {
    props: { organisations }
  };
};

type Props = {
  organisations: Organisation[];
};

const CompleteSignup: React.FC<Props> = props => {
  const [schoolModalOpen, setSchoolModalOpen] = React.useState(false);
  const [schoolName, setSchoolName] = React.useState('');
  const [session, loading] = useSession();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm();

  useEffect(() => {
    if (!(session || loading)) {
      router.push('/api/auth/signin');
    }
  }, [session, loading, router]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const request = await axios.get('/api/user/org');
      if (request.status === 201) {
        const school = request.data;
        setSchoolName(school.name);
      } else {
        setSchoolName(' ');
      }
    } catch (e) {
      console.log(e);
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="page">
          <h1 className="text-3xl">Informationen</h1>
          <main>Lade...</main>
        </div>
      </Layout>
    );
  }

  if (!(session || loading)) {
    return <p>Redirecting...</p>;
  }

  if (!(session || loading)) {
    return <p>Redirecting...</p>;
  }

  const onSubmit = async data => {
    console.log(data);

    const request = await axios.post('/api/user', {
      name: data.name
    });

    if (request.status === 201) {
      await signOut();
      toast.success('Profil erfolgreich gespeichert');
      // router.push('/');
    }
  };

  return (
    <Layout>
      <div className="page">
        <h1 className="text-3xl">Informationen</h1>
        <main>
          <form
            className="max-w-xl m-auto py-10 mt-10 px-12"
            onSubmit={handleSubmit(onSubmit)}
          >
            <label className="text-gray-600 font-medium">Name</label>
            <input
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
              name="name"
              defaultValue={session.user.name}
              placeholder="Max Mustermann"
              {...register('name', {
                required: true
              })}
            />
            {errors.name && (
              <div className="mb-3 text-normal text-red-500">
                Name darf nicht leer sein
              </div>
            )}

            <label className="text-gray-600 font-medium">
              Schule oder Organisation
            </label>

            <div>
              <p
                className="border-solid bg-white border-gray-300 border py-2 px-4 w-full rounded h-10 text-gray-700 cursor-pointer"
                onClick={() => setSchoolModalOpen(true)}
              >
                {schoolName ?? ' '}
              </p>
            </div>

            <Button type="submit">Speichern</Button>
          </form>
          <UserSchoolModal
            opened={schoolModalOpen}
            organisations={props.organisations}
            closeModal={() => {
              setSchoolModalOpen(false);
              fetchData();
            }}
          ></UserSchoolModal>
        </main>
      </div>
    </Layout>
  );
};

export default CompleteSignup;
