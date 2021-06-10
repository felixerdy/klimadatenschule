import React from 'react';
import Layout from '../../components/Layout';
import SectionHeader from '../../components/SectionHeader';

const Ernaehrung: React.FC = () => {
  return (
    <Layout>
      <div className="page text-center">
        <SectionHeader color="red" text="Ernährung" />
        <main className="mt-20"></main>
      </div>
    </Layout>
  );
};

export default Ernaehrung;
