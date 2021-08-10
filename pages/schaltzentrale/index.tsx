import React, { useEffect } from 'react';
import Layout from '../../components/Layout';
import { useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
// import prisma from './../../lib/prisma';
// import { GetServerSideProps } from 'next';
import { Organisation, Role, User } from '@prisma/client';
import Link from 'next/link';

// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const organisations = await prisma.organisation.findMany();
//   const users = await prisma.user.findMany();

//   return {
//     props: { organisations, users }
//   };
// };

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
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
            <li>
              <Link href={'/schaltzentrale/user'}>
                <a className="hover:bg-light-blue-500 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200">
                  <dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
                    <div>
                      <dt className="sr-only">Title</dt>
                      <dd className="group-hover:text-light-blue-200 text-sm font-medium sm:mb-4 lg:mb-0 xl:mb-4">
                        👪 Nutzer*innen
                      </dd>
                    </div>
                  </dl>
                </a>
              </Link>
            </li>
            <li>
              <Link href={'/schaltzentrale/orgs'}>
                <a className="hover:bg-light-blue-500 hover:border-transparent hover:shadow-lg group block rounded-lg p-4 border border-gray-200">
                  <dl className="grid sm:block lg:grid xl:block grid-cols-2 grid-rows-2 items-center">
                    <div>
                      <dt className="sr-only">Category</dt>
                      <dd className="group-hover:text-light-blue-200 text-sm font-medium sm:mb-4 lg:mb-0 xl:mb-4">
                        🏫 Organisationen
                      </dd>
                    </div>
                  </dl>
                </a>
              </Link>
            </li>
          </ul>
        </main>
      </div>
    </Layout>
  );
};

export default Schaltzentrale;
