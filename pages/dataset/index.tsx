import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import SectionHeader from '../../components/SectionHeader';
import Card from '../../components/Card';
import { useSession, getSession } from 'next-auth/client';
import prisma from '../../lib/prisma';
import Router from 'next/router';
import { DatasetProps } from '../../components/Post';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const mealCount = await prisma.mealRecord.count();
  const mobilityCount = await prisma.mobilityRecord.count();
  const datasets = await prisma.dataset.findMany({
    include: {
      publisher: {
        select: { name: true }
      }
    }
  });

  return {
    props: { datasets: datasets, mealCount, mobilityCount }
  };
};

type Props = {
  datasets: DatasetProps[];
  mealCount: number;
  mobilityCount: number;
};

const Drafts: React.FC<Props> = props => {
  return (
    <Layout>
      <div className="page">
        <SectionHeader color="" text="Datensätze" />
        <main className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card
              dataset="nutrition"
              title="Ernährung"
              entries={props.mealCount}
              image="nutrition"
            />
            <Card
              dataset="mobility"
              title="Mobilität"
              entries={props.mobilityCount}
              image="mobility"
            />
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Drafts;
