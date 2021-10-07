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
import DatasetActions from '../../components/DatasetActions';

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
  }, [session, loading, router]);

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
            {props.records.map((r, i) => (
              <Disclosure key={i}>
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
                                  CO₂ in kg
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
                                    {r[m.type] * m.thgpst}g CO₂
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                            <tfoot>
                              <tr>
                                <td colSpan={3}>
                                  <DatasetActions
                                    record={r}
                                    deleteRecord={deleteRecord}
                                    openRecord={openModal}
                                  ></DatasetActions>
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
