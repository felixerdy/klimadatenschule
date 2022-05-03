import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import SectionHeader from '../../components/SectionHeader';
import Card from '../../components/Card';
import { useSession, getSession } from 'next-auth/client';
import prisma from '../../lib/prisma';
import Router from 'next/router';
import { DatasetProps } from '../../components/Post';

import Image from 'next/image';

import BaumIcon from '../../public/images/kds-icon-baeume.svg';
import ErnaehrungIcon from '../../public/images/kds-icon-ernaehrung.svg';
import MobilitaetIcon from '../../public/images/kds-icon-mobilitaet.svg';
import PapierIcon from '../../public/images/kds-icon-papier.svg';

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
        <div>
          <h1 className="text-5xl text-center uppercase my-20">
            Daten&shy;sätze
          </h1>
        </div>
        <main className="mt-20 flex flex-col flex-wrap md:flex-row justify-center items-center">
          <Card
            dataset="tree"
            title="Bäume"
            entries={props.treeCount}
            image={BaumIcon}
          />
          <Card
            dataset="mobility"
            title="Mobilität"
            entries={props.mobilityCount}
            image={MobilitaetIcon}
          />
          <Card
            dataset="paper"
            title="Papier"
            entries={props.paperCount}
            image={PapierIcon}
          />
          <Card
            dataset="nutrition"
            title="Ernährung"
            entries={props.mealCount}
            image={ErnaehrungIcon}
          />

          <p className="mt-8 text-lg">
            Die Vorgehensweise bei der Datenerhebung können sich unterscheiden.
            Bitte beachtet das bei eurer Datenanalyse.
          </p>
        </main>
      </div>
    </Layout>
  );
};

export default Drafts;
