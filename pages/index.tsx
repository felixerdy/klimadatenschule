import { GetStaticProps } from 'next';
import React from 'react';
import Layout from '../components/Layout';
import Post, { DatasetProps } from '../components/Post';
import prisma from '../lib/prisma';
import Image from 'next/image';

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

      <section className="mt-10">
        <h1 className="text-gray-800 text-4xl font-extrabold">Projekte</h1>
      </section>

      <h1>Public Feed</h1>

      <main>
        {props.datasets.map(post => (
          <div key={post.id} className="post">
            <Post post={post} />
          </div>
        ))}
      </main>
    </>
  );
};

export default Home;
