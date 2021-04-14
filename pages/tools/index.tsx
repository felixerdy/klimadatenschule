import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import { useSession, getSession } from 'next-auth/client';
import prisma from '../../lib/prisma';
import Router from 'next/router';
import { DatasetProps } from '../../components/Post';

const Tools: React.FC = () => {
  return (
    <Layout>
      <div className="page">
        <h1 className="text-gray-800 text-4xl font-extrabold">Werkzeuge</h1>
        <main>
          <div
            className="rounded-xl bg-gray-50 p-8 m-8 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => Router.push(`/tools/landcover`)}
          >
            <h1 className="text-xl">Flächennutzung</h1>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Tools;
