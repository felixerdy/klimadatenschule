import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { useSession, getSession } from 'next-auth/client';
import prisma from '../../lib/prisma';
import Router from 'next/router';
import { DatasetProps } from '../../components/Post';
import ItemRow from '../../components/ItemRow';

const Tools: React.FC = () => {
  return (
    <Layout>
      <div className="page">
        <h1 className="text-gray-800 text-4xl font-extrabold">Werkzeuge</h1>
        <main>
          <ItemRow
            onClick={() => Router.push(`/tools/landcover`)}
            title={'Landcover'}
          ></ItemRow>
          <ItemRow
            onClick={() => Router.push(`/tools/nutrition-calculator`)}
            title={'Ernährungsrechner'}
          ></ItemRow>
        </main>
      </div>
    </Layout>
  );
};

export default Tools;
