import { GetStaticProps } from 'next';
import React from 'react';
import { DatasetProps } from '../components/Post';
import prisma from '../lib/prisma';
import Image from 'next/image';
import Router from 'next/router';
import FlowCO2Calculator from '../components/FlowCO2Calculator';
import ItemRow from '../components/ItemRow';

// index.tsx
export const getStaticProps: GetStaticProps = async () => {
  const datasets = await prisma.dataset.findMany({
    include: {
      publisher: {
        select: { name: true }
      }
    }
  });
  return { props: { datasets } };
};

type Props = {
  datasets: DatasetProps[];
};

const Home: React.FC<Props> = (props: Props) => {
  return (
    <>
      <div className="flex items-center justify-evenly flex-col-reverse sm:flex-row">
        <Image
          src="/images/undraw_team_work_k80m.svg"
          alt="Picture of the author"
          width={400}
          height={400}
        ></Image>
        <h1 className="text-gray-800 text-8xl font-extrabold">
          <span className="block">Klima</span>
          <span className="block">Daten</span>
          <span className="block">Schule</span>
        </h1>
      </div>
      <div className="h-96">
        <FlowCO2Calculator></FlowCO2Calculator>
      </div>

      <section className="mt-10">
        <h1 className="text-gray-800 text-4xl font-extrabold">Datensätze</h1>
      </section>

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
    </>
  );
};

export default Home;
