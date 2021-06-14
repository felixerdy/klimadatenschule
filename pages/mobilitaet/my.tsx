import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { useSession, getSession } from 'next-auth/client';
import prisma from '../../lib/prisma';
import { useRouter } from 'next/router';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { records: [] } };
  }

  const records = await prisma.mobilityRecord.findMany({
    where: {
      user: { email: session.user.email }
    }
  });

  return {
    props: { records }
  };
};

type MobilityRecord = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  pkw: number;
  bahn: number;
  bus: number;
  ubahn: number;
  fahrrad: number;
  fuss: number;
};

type MobilityType = 'pkw' | 'bahn' | 'bus' | 'ubahn' | 'fahrrad' | 'fuss';

type MobilityDescription = {
  type: MobilityType;
  title: string;
  thgpkm: number;
};

const Mobilities: MobilityDescription[] = [
  {
    type: 'pkw',
    title: '🚙 PKW',
    thgpkm: 143
  },
  {
    type: 'bahn',
    title: '🚂 Eisenbahn',
    thgpkm: 55
  },
  {
    type: 'bus',
    title: '🚌 Bus',
    thgpkm: 88
  },
  {
    type: 'ubahn',
    title: '🚋 S-Bahn / U-Bahn',
    thgpkm: 55
  },
  {
    type: 'fahrrad',
    title: '🚴 Fahrrad',
    thgpkm: 0
  },
  {
    type: 'fuss',
    title: '🚶 zu Fuß',
    thgpkm: 0
  }
];

type Props = {
  records: MobilityRecord[];
};

const MyMobilityRecords: React.FC<Props> = props => {
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

  console.log(props);

  return (
    <Layout>
      <div className="page">
        <h1 className="text-3xl text-center">Mein Schulweg</h1>
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
                                  Verkehrsmittel
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  km pro Woche
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                  Treibhausgase
                                </th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {Mobilities.map(m => (
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
                          </table>
                        </div>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default MyMobilityRecords;
