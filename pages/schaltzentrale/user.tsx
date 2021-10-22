import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { GetServerSideProps } from 'next';
import prisma from './../../lib/prisma';
import { Role, User } from '@prisma/client';
import UserModal from '../../components/Modals/UserModal';
import Link from 'next/link';
import { getSession, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';
import LoadingScreen from '../../components/LoadingScreen';

export const getServerSideProps: GetServerSideProps = async context => {
  // Get the user's session based on the request
  const session = await getSession(context);

  // Redirect request if role is not ADMIN
  // @ts-ignore
  if (session?.user.role !== Role.ADMIN) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }

  const users = await prisma.user.findMany();
  return {
    props: { users }
  };
};

type Props = {
  users: User[];
};

const UserTable: React.FC<Props> = ({ users }) => {
  const [opened, setOpened] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [filter, setFilter] = useState('');

  const [session, loading] = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!(session || loading)) {
      router.push('/api/auth/signin');
    }

    console.log(session);

    // @ts-ignore
    if (session && !loading && session.user?.role !== Role.ADMIN) {
      router.push('/');
    }
  }, [session, loading, router]);

  if (!(session || loading)) {
    return <p>Redirecting...</p>;
  }

  if (loading) {
    return <LoadingScreen />;
  }

  function closeModal() {
    setSelectedUser(null);
    setOpened(false);
  }

  function openModal(user: User) {
    setSelectedUser(user);
    setOpened(true);
  }

  function filterUsers(e: React.ChangeEvent<HTMLInputElement>) {
    const search = e.target.value;
    setFilter(search);
  }

  return (
    <Layout>
      <div className="page">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-3xl">
            <Link href={'/schaltzentrale'}>🎛 Schaltzentrale</Link> / 👪
            Nutzer*innen
          </h1>
        </header>
        <main>
          <div className="mb-8 mt-4">
            <label className="font-semibold">
              Nach Name oder E-Mail filtern
            </label>
            <input
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded "
              type="text"
              onChange={e => filterUsers(e)}
            />
          </div>
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
                {users
                  .filter(
                    u =>
                      u.email.toLowerCase().includes(filter.toLowerCase()) ||
                      u.name.toLowerCase().includes(filter.toLowerCase())
                  )
                  .map(user => (
                    <tr key={user.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.role}
                      </td>
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

export default UserTable;
