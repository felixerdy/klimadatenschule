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
  const treeCount = await prisma.treeRecord.count();
  const paperCount = await prisma.paperRecord.count();
  const datasets = await prisma.dataset.findMany({
    include: {
      publisher: {
        select: { name: true }
      }
    }
  });

  return {
    props: {
      datasets: datasets,
      mealCount,
      mobilityCount,
      treeCount,
      paperCount
    }
  };
};

type Props = {
  datasets: DatasetProps[];
  mealCount: number;
  mobilityCount: number;
  treeCount: number;
  paperCount: number;
};

const Drafts: React.FC<Props> = props => {
  return (
    <Layout>
      <div className="page">
        <SectionHeader color="" text="Datensätze" />
        <main className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card
              dataset="tree"
              title="Wald & Bäume"
              entries={props.treeCount}
              image="tree"
            />
            <Card
              dataset="nutrition"
              title="Ernährung"
              entries={props.mealCount}
              image="nutrition"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <Card
              dataset="paper"
              title="Papier"
              entries={props.paperCount}
              image="paper"
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
