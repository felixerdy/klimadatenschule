import { Organisation } from '@prisma/client';
import { GetServerSideProps } from 'next';
import { useState } from 'react';
import prisma from './../../lib/prisma';
import Layout from '../../components/Layout';
import SchoolModal from '../../components/Modals/SchoolModal';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const organisations = await prisma.organisation.findMany();

  return {
    props: { organisations }
  };
};

type Props = {
  organisations: Organisation[];
};

const OrgTable: React.FC<Props> = ({ organisations }) => {
  const [opened, setOpened] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState<Organisation | null>(null);

  function closeModal() {
    setSelectedOrg(null);
    setOpened(false);
  }

  function openModal(org: Organisation) {
    setSelectedOrg(org);
    setOpened(true);
  }

  return (
    <Layout>
      <div className="page">
        <h1 className="text-3xl">🎛 Schaltzentrale / 🏫 Organisationen</h1>
        <main>
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
                {organisations.map(org => (
                  <tr key={org.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{org.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{org.type}</td>
                    <td>
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {selectedOrg && (
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
