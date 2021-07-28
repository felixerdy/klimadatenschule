import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { useSession, getSession } from 'next-auth/client';
import prisma from '../../lib/prisma';
import { useRouter } from 'next/router';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { PaperRecord } from '@prisma/client';
import { PaperProducts } from '.';
import { toast } from 'react-toastify';
import PaperModal from '../../components/Modals/PaperModal';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { records: [] } };
  }

  const records = await prisma.paperRecord.findMany({
    where: {
      user: { email: session.user.email }
    }
  });

  return {
    props: { records }
  };
};

type Props = {
  records: PaperRecord[];
};

const MyPaperRecords: React.FC<Props> = props => {
  const [opened, setOpened] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<PaperRecord | null>(
    null
  );
  const [session, loading] = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!(session || loading)) {
      router.push('/api/auth/signin');
    }
  }, [session, loading]);

  if (!(session || loading)) {
    return <p>Redirecting...</p>;
  }

  function closeModal() {
    setSelectedRecord(null);
    setOpened(false);
  }

  function openModal(record) {
    setSelectedRecord(record);
    setOpened(true);
  }

  const deleteRecord = async (record: PaperRecord) => {
    try {
      const response = await fetch(`/api/paper/${record.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success('Datensatz erfolgreich gelöscht!');
        // Refresh server side props
        // https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
        router.replace(router.asPath);
      } else {
        toast.error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="page">
        <h1 className="text-3xl text-center">Mein Papierverbrauch</h1>
        <main>
          <div className="w-full max-w-4xl p-2 mx-auto bg-white rounded-2xl">
            {props.records.map(r => (
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 m-1 text-sm font-medium text-left text-mobility-darker bg-mobility-light rounded-lg hover:bg-mobility-lighter focus:outline-none focus-visible:ring focus-visible:ring-mobility focus-visible:ring-opacity-75">
                      <span>{r.createdAt.toDateString()}</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-mobility-darker`}
                      />
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                        <div className="max-w-xl shadow overflow-scroll sm:overflow-auto border-b border-gray-200 sm:rounded-lg m-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Produkt
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Anzahl pro Halbjahr
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  CO2 in kg
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {PaperProducts.map(m => (
                                <tr key={m.type}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {m.title}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {r[m.type]}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {r[m.type] * m.thgpkm}g CO2
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr>
                                <td>
                                  <div
                                    className="flex flex-1 px-6 py-4"
                                    title="Datensatz editieren"
                                  >
                                    <div className="w-full text-center">
                                      <button
                                        className="m-4 text-nutrition-darkest bg-nutrition-lightest px-4 py-2 text-sm font-semibold rounded-lg hover:bg-nutrition-light focus:bg-gray focus:outline-none focus:shadow-outline inline-flex items-center"
                                        type="button"
                                        onClick={() => openModal(r)}
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
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div
                                    className="flex flex-1 px-6 py-4"
                                    title="Datensatz löschen"
                                  >
                                    <div className="w-full text-center">
                                      <button
                                        className="m-4 text-nutrition-darkest bg-nutrition-lightest px-4 py-2 text-sm font-semibold rounded-lg hover:bg-nutrition-light focus:bg-gray focus:outline-none focus:shadow-outline inline-flex items-center"
                                        type="button"
                                        onClick={() => deleteRecord(r)}
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
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tfoot>
                          </table>
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
          {selectedRecord && (
            <PaperModal
              opened={opened}
              record={selectedRecord}
              closeModal={closeModal}
            ></PaperModal>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default MyPaperRecords;
