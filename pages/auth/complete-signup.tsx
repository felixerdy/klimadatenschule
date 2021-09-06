import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { getSession, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import prisma from './../../lib/prisma';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { toast } from 'react-toastify';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const organisations = await prisma.organisation.findMany();

  return {
    props: { organisations }
  };
};

type Props = {
  organisations: { id: string; name: string }[];
};

const CompleteSignup: React.FC<Props> = props => {
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
      name: data.name,
      organisation: data.organisation
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

            <select
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
              name="organisation"
              // @ts-ignore
              defaultValue={String(session.user.organisationId)}
              {...register('organisation', {
                required: true
              })}
            >
              <option disabled>Wähle deine Schule / Organisation</option>
              {props.organisations.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
              <option disabled>------------</option>
              <option value="null">Keine Schule / Organisation</option>
            </select>

            <button
              className="mt-4 w-full bg-yellow-400 hover:bg-yellow-600 text-yellow-100 border py-3 px-6 font-semibold text-md rounded"
              type="submit"
            >
              Speichern
            </button>
          </form>
        </main>
      </div>
    </Layout>
  );
};

export default CompleteSignup;
