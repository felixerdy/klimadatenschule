import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { useSession, getSession } from 'next-auth/client';
import prisma from '../../lib/prisma';
import Router from 'next/router';
import { DatasetProps } from '../../components/Post';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { datasets: [] } };
  }

  const datasets = await prisma.dataset.findMany({
    where: {
      publisher: { email: session.user.email }
    },
    include: {
      publisher: {
        select: { name: true }
      }
    }
  });

  return {
    props: { datasets: JSON.parse(JSON.stringify(datasets)) }
  };
};

type Props = {
  datasets: DatasetProps[];
};

const Drafts: React.FC<Props> = props => {
  const [session] = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1 className="text-3xl">My Datasets</h1>
        <main>
          {props.datasets.map(dataset => (
            <div
              key={dataset.id}
              className="rounded-xl bg-gray-50 p-8 m-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
              onClick={() => Router.push(`/dataset/${dataset.id}`)}
            >
              <h1 className="text-xl">{dataset.title}</h1>
              <h3 className="text-indigo-700 font-semibold">
                by {dataset.publisher.name}
              </h3>
            </div>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Drafts;
