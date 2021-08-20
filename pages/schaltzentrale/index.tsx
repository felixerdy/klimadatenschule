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
    if (session && !loading && session.user?.role === Role.USER) {
      router.push('/');
    }

    console.log(session);
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
            {/* @ts-ignore */}
            {session.user.role === Role.ADMIN && (
              <li>
                <Link href={'/schaltzentrale/user'} passHref>
                  <div
                    className={`p-10 m-8 md:p-20 w-full rounded-2xl shadow-lg cursor-pointer group`}
                  >
                    <h1
                      className={`text-4xl font-semibold transform duration-100 group-hover:translate-x-4`}
                    >
                      👪 Nutzer*innen
                    </h1>
                  </div>
                </Link>
              </li>
            )}
            <li>
              <Link href={'/schaltzentrale/orgs'} passHref>
                <div
                  className={`p-10 m-8 md:p-20 w-full rounded-2xl shadow-lg cursor-pointer group`}
                >
                  <h1
                    className={`text-4xl font-semibold transform duration-100 group-hover:translate-x-4`}
                  >
                    🏫 Organisationen
                  </h1>
                </div>
              </Link>
            </li>
          </ul>
        </main>
      </div>
    </Layout>
  );
};

export default Schaltzentrale;
