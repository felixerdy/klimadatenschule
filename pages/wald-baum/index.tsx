import React from 'react';
import Layout from '../../components/Layout';
import SectionHeader from '../../components/SectionHeader';

const WaldBaum: React.FC = () => {
  return (
    <Layout>
      <div className="page text-center">
        <SectionHeader color="green" text="Wald & Bäume" />
        <main className="mt-20"></main>
      </div>
    </Layout>
  );
};

export default WaldBaum;
