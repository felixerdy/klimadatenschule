import React, { useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { useSession, getSession } from 'next-auth/client';
import prisma from '../../lib/prisma';
import { useRouter } from 'next/router';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';
import { toast } from 'react-toastify';
import MealModal from '../../components/Modals/MealModal';
import { MealRecord } from '../../types/meal';
import DatasetActions from '../../components/DatasetActions';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { records: [] } };
  }

  const records = await prisma.mealRecord.findMany({
    where: {
      user: { email: session.user.email }
    }
  });

  return {
    props: { records }
  };
};

type Props = {
  records: MealRecord[];
};

const MyMealRecords: React.FC<Props> = props => {
  const [opened, setOpened] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<MealRecord | null>(null);
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

  function openModal(record: MealRecord) {
    setSelectedRecord(record);
    setOpened(true);
  }

  const deleteRecord = async (record: MealRecord) => {
    console.log(record);

    try {
      const response = await fetch(`/api/meal/${record.id}`, {
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
        <h1 className="text-3xl text-center">Ernährung meiner Schule</h1>
        <main>
          <div className="w-full max-w-4xl p-2 mx-auto bg-white rounded-2xl">
            {props.records
              .sort((a, b) => +b.timestamp - +a.timestamp)
              .map((r, i) => (
                <Disclosure key={i}>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between w-full px-4 py-2 m-1 text-sm font-medium text-left text-nutrition-dark bg-nutrition-light rounded-lg hover:bg-nutrition-lighter focus:outline-none focus-visible:ring focus-visible:ring-mobility focus-visible:ring-opacity-75">
                        <span>{r.timestamp.toLocaleDateString()}</span>
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
                              <thead className="bg-nutrition-lightest">
                                <tr>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Name
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Datum
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    CO₂ in kg
                                  </th>
                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Anzahl der Gerichte
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="bg-white divide-y divide-gray-200">
                                <tr key={r.id}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {r.name}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {r.timestamp.toLocaleDateString()}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {r.co2}
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    {r.count}
                                  </td>
                                </tr>
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
            <MealModal
              opened={opened}
              record={selectedRecord}
              closeModal={closeModal}
            ></MealModal>
          )}
        </main>
      </div>
    </Layout>
  );
};

export default MyMealRecords;
