import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { useSession, getSession } from 'next-auth/client';
import prisma from '../../lib/prisma';
import Router from 'next/router';
import { DatasetProps } from '../../components/Post';
import ItemRow from '../../components/ItemRow';

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
            <ItemRow
              key={dataset.id}
              onClick={() => Router.push(`/dataset/${dataset.id}`)}
              title={dataset.title}
              publisher={dataset.publisher.name}
            ></ItemRow>
          ))}
        </main>
      </div>
    </Layout>
  );
};

export default Drafts;
