import { GetStaticProps } from 'next';
import React from 'react';
import { DatasetProps } from '../components/Post';
import prisma from '../lib/prisma';
import Image from 'next/image';
import Router from 'next/router';
import FlowCO2Calculator from '../components/FlowCO2Calculator';
import ItemRow from '../components/ItemRow';
import SectionHeader from '../components/SectionHeader';
import Link from 'next/link';

import BaumIcon from './../public/images/kds-icon-baeume.svg';
import ErnaehrungIcon from './../public/images/kds-icon-ernaehrung.svg';
import MobilitaetIcon from './../public/images/kds-icon-mobilitaet.svg';
import PapierIcon from './../public/images/kds-icon-papier.svg';

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
      <div>
        <h1 className="text-5xl text-center uppercase my-20">
          Wähle dein For&shy;schungs&shy;gebiet
        </h1>
      </div>

      <main>
        <div className="flex flex-row flex-wrap justify-center items-center">
          <Link href="/wald-baum" passHref>
            <div className="text-center p-4 sm:p-8 m-2 sm:m-8 max-w-xxxs sm:max-w-xxs transform hover:scale-110 duration-150 cursor-pointer bg-white rounded-lg shadow">
              <h2 className="text-lg sm:text-2xl uppercase">Bäume</h2>
              <Image src={BaumIcon} alt="Baeume Icon"></Image>
            </div>
          </Link>
          <Link href="/mobilitaet" passHref>
            <div className="text-center p-4 sm:p-8 m-2 sm:m-8 max-w-xxxs sm:max-w-xxs transform hover:scale-110 duration-150 cursor-pointer bg-white rounded-lg shadow">
              <h2 className="text-lg sm:text-2xl uppercase">Mobilität</h2>
              <Image src={MobilitaetIcon} alt="Mobilität Icon"></Image>
            </div>
          </Link>
        </div>
        <div className="flex flex-row flex-wrap justify-center items-center">
          <Link href="/papier" passHref>
            <div className="text-center p-4 sm:p-8 m-2 sm:m-8 max-w-xxxs sm:max-w-xxs transform hover:scale-110 duration-150 cursor-pointer bg-white rounded-lg shadow">
              <h2 className="text-lg sm:text-2xl uppercase">Papier</h2>
              <Image src={PapierIcon} alt="Papier Icon"></Image>
            </div>
          </Link>
          <Link href="/ernaehrung" passHref>
            <div className="text-center p-4 sm:p-8 m-2 sm:m-8 max-w-xxxs sm:max-w-xxs transform hover:scale-110 duration-150 cursor-pointer bg-white rounded-lg shadow">
              <h2 className="text-lg sm:text-2xl uppercase">Ernährung</h2>
              <Image src={ErnaehrungIcon} alt="Ernährung Icon"></Image>
            </div>
          </Link>
          {/* <SectionHeader
            color="mobility"
            text="Mobilität"
            button
            href="mobilitaet"
          />
          <SectionHeader color="blue" text="Papier" button href="papier" />
          <SectionHeader
            color="green"
            text="Wald & Bäume"
            button
            href="wald-baum"
          />
          <SectionHeader
            color="nutrition"
            text="Ernährung"
            button
            href="ernaehrung"
          /> */}
        </div>
      </main>
    </>
  );
};

export default Home;
