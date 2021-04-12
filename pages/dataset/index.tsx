import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { useSession, getSession } from 'next-auth/client';
import prisma from '../../lib/prisma';
import Router from 'next/router';
import { DatasetProps } from '../../components/Post';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const datasets = await prisma.dataset.findMany({
    include: {
      publisher: {
        select: { name: true }
      }
    }
  });

  return {
    props: { datasets: datasets }
  };
};

type Props = {
  datasets: DatasetProps[];
};

const Drafts: React.FC<Props> = props => {
  return (
    <Layout>
      <div className="page">
        <h1 className="text-gray-800 text-4xl font-extrabold">Datensätze</h1>
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
