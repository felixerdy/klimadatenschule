import React from 'react';
import Layout from '../../components/Layout';
import SectionHeader from '../../components/SectionHeader';

const Papier: React.FC = () => {
  return (
    <Layout>
      <div className="page text-center">
        <SectionHeader color="blue" text="Papier" />
        <main className="mt-20"></main>
      </div>
    </Layout>
  );
};

export default Papier;
