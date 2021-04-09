import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../components/Layout';
import { useSession, getSession } from 'next-auth/client';
import prisma from '../lib/prisma';
import Router from 'next/router';

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { datasets: [] } };
  }

  const datasets = await prisma.dataset.findMany({
    where: {
      publisher: { email: session.user.email }
    },
    include: {
      publisher: {
        select: { name: true }
      }
    }
  });

  return {
    props: { datasets: JSON.parse(JSON.stringify(datasets)) }
  };
};

type Props = {
  datasets: any[];
};

const Drafts: React.FC<Props> = props => {
  const [session] = useSession();

  if (!session) {
    return (
      <Layout>
        <h1>My Drafts</h1>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1>My Datasets</h1>
        <main>
          {props.datasets.map(dataset => (
            <div
              key={dataset.id}
              className="post"
              onClick={() => Router.push(`/dataset/${dataset.id}`)}
            >
              {JSON.stringify(dataset)}
              <img
                src={`${process.env.BUCKET_BASEURL}${dataset.filepath}`}
              ></img>
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post {
          background: white;
          transition: box-shadow 0.1s ease-in;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  );
};

export default Drafts;
