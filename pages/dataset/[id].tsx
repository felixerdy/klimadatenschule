import React, { useEffect, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import Router from 'next/router';
import { DatasetProps } from '../../components/Post';
import { useSession } from 'next-auth/client';
import prisma from '../../lib/prisma';
import Table from '../../components/Table';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const dataset = await prisma.dataset.findUnique({
    where: {
      id: (params?.id as string) || ''
    },
    include: {
      publisher: {
        select: { name: true, email: true }
      }
    }
  });

  return {
    props: {
      ...dataset
    }
  };
};

async function deleteDataset(id: number): Promise<void> {
  await fetch(`/api/dataset/${id}`, {
    method: 'DELETE'
  });
  Router.push('/');
}

const Dataset: React.FC<DatasetProps> = props => {
  const [session, loading] = useSession();
  if (loading) {
    return <div>Authenticating ...</div>;
  }

  if (Object.keys(props).length === 0) {
    return <div>Nout found</div>;
  }

  const datasetBelongsToUser = session?.user?.email === props.publisher?.email;

  return (
    <Layout>
      <div>
        <h2 className="text-gray-800 text-4xl">{props.title}</h2>
        <p>By {props?.publisher?.name || 'Unknown author'}</p>
      </div>
      {datasetBelongsToUser && (
        <div className="my-4">
          <button
            onClick={() => deleteDataset(props.id)}
            className={`text-white bg-red-700 px-4 py-2 mt-2 text-sm font-semibold rounded-lg md:mt-0 hover:bg-red-900 focus:bg-gray focus:outline-none focus:shadow-outline`}
          >
            Datensatz löschen
          </button>
        </div>
      )}
      <Table data={props.data}></Table>
    </Layout>
  );
};

export default Dataset;
