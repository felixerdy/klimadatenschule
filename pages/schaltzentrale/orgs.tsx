import { Organisation, User, Role } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import prisma from './../../lib/prisma';
import Layout from '../../components/Layout';
import SchoolModal from '../../components/Modals/SchoolModal';
import { toast } from 'react-toastify';
import router from 'next/router';
import Link from 'next/link';
import { getSession, session, useSession } from 'next-auth/client';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: {} };
  }

  const organisations = await prisma.organisation.findMany({
    include: {
      createdBy: true
    }
  });

  return {
    props: { organisations }
  };
};

type Props = {
  organisations: (Organisation & {
    createdBy: User;
  })[];
};

const OrgTable: React.FC<Props> = ({ organisations }) => {
  const [opened, setOpened] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organisation | null>(null);
  const [session, loading] = useSession();

  const [filter, setFilter] = useState('');

  function closeModal() {
    setSelectedOrg(null);
    setOpened(false);
  }

  function openModal(org: Organisation) {
    setSelectedOrg(org);
    setOpened(true);
  }

  function filterOrgs(e: React.ChangeEvent<HTMLInputElement>) {
    const search = e.target.value;
    setFilter(search);
  }

  async function deleteOrganisation(org: Organisation) {
    try {
      const response = await fetch(`/api/organisation/${org.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success(`${org.name} erfolgreich gelöscht`);
        router.replace(router.asPath);
      } else {
        toast.error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      // setUploadLoading(false);
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="page">Loading...</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-3xl">
            <Link href={'/schaltzentrale'}>🎛 Schaltzentrale</Link> / 🏫
            Organisationen
          </h1>
          <button
            className="group flex items-center rounded-md text-paper-darkest bg-paper-light px-4 py-2 mt-2  text-sm font-semibold md:mt-0 hover:bg-gray-300 focus:bg-gray focus:outline-none focus:shadow-outline"
            onClick={() => setOpened(true)}
          >
            <svg
              className="group-hover:text-light-blue-600 text-light-blue-500 mr-2"
              width="12"
              height="20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 5a1 1 0 011 1v3h3a1 1 0 110 2H7v3a1 1 0 11-2 0v-3H2a1 1 0 110-2h3V6a1 1 0 011-1z"
              />
            </svg>
            New
          </button>
        </header>
        <main>
          <div className="mb-8 mt-4">
            <label className="font-semibold">Nach Name filtern</label>
            <input
              className="border-solid border-gray-300 border py-2 px-4 w-full rounded "
              type="text"
              onChange={e => filterOrgs(e)}
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
                    Typ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {organisations
                  .filter(o =>
                    o.name.toLowerCase().includes(filter.toLowerCase())
                  )
                  .map(org => (
                    <tr key={org.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {org.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {org.type}
                      </td>
                      <td>
                        {(org.createdBy.email === session.user.email ||
                          // @ts-ignore
                          session.user?.role === Role.ADMIN) && (
                          <>
                            <button
                              className="m-4 text-nutrition-darkest bg-yellow-100 px-4 py-2 text-sm font-semibold rounded-lg hover:bg-yellow-200 focus:bg-gray focus:outline-none focus:shadow-outline inline-flex items-center"
                              type="button"
                              onClick={() => openModal(org)}
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
                            <button
                              className="m-4 text-nutrition-darkest bg-red-200 px-4 py-2 text-sm font-semibold rounded-lg hover:bg-red-300 focus:bg-gray focus:outline-none focus:shadow-outline inline-flex items-center"
                              type="button"
                              onClick={() => deleteOrganisation(org)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>Löschen</span>
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {opened && (
            <SchoolModal
              opened={opened}
              organisation={selectedOrg}
              closeModal={closeModal}
            ></SchoolModal>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default OrgTable;
