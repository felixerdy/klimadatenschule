import React from 'react';
import Layout from '../../components/Layout';
import SectionHeader from '../../components/SectionHeader';

const Verkehr: React.FC = () => {
  return (
    <Layout>
      <div className="page text-center">
        <SectionHeader color="gray" text="Verkehr" />
        <main className="mt-20"></main>
      </div>
    </Layout>
  );
};

export default Verkehr;
