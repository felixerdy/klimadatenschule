import React, { useState } from 'react';
import Layout from '../../components/Layout';
import SectionHeader from '../../components/SectionHeader';
import InfoBox from '../../components/InfoBox';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Router from 'next/dist/next-server/server/router';

type Inputs = {
  timestamp: Date;
  pkw: number;
  bahn: number;
  bus: number;
  ubahn: number;
  fahrrad: number;
  fuss: number;
};

type MobilityType = 'pkw' | 'bahn' | 'bus' | 'ubahn' | 'fahrrad' | 'fuss';

type MobilityDescription = {
  type: MobilityType;
  title: string;
  thgpkm: number;
};

const Mobilities: MobilityDescription[] = [
  {
    type: 'pkw',
    title: '🚙 PKW',
    thgpkm: 143
  },
  {
    type: 'bahn',
    title: '🚂 Eisenbahn',
    thgpkm: 55
  },
  {
    type: 'bus',
    title: '🚌 Bus',
    thgpkm: 88
  },
  {
    type: 'ubahn',
    title: '🚋 S-Bahn / U-Bahn',
    thgpkm: 55
  },
  {
    type: 'fahrrad',
    title: '🚴 Fahrrad',
    thgpkm: 0
  },
  {
    type: 'fuss',
    title: '🚶 zu Fuß',
    thgpkm: 0
  }
];

const Mobilitaet: React.FC = () => {
  const { register, watch, handleSubmit } = useForm<Inputs>();

  const [uploadLoading, setUploadLoading] = useState(false);

  const onSubmit = async data => {
    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append('pkw', data.pkw);
      formData.append('bahn', data.bahn);
      formData.append('bus', data.bus);
      formData.append('ubahn', data.ubahn);
      formData.append('fahrrad', data.fahrrad);
      formData.append('fuss', data.fuss);

      const response = await fetch('/api/mobility', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        toast.success('Datensatz erfolgreich hochgeladen');
      } else {
        toast.error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploadLoading(false);
    }
  };

  const inputData = watch();

  return (
    <Layout>
      <div className="page">
        <SectionHeader color="mobility" text="Mobilität" />
        <main className="mt-20 text-center">
          <Link href={'/mobilitaet/my'}>
            <a className="text-mobility-darkest bg-mobility-light px-4 py-2 mt-2  text-sm font-semibold rounded-lg md:mt-0 hover:bg-gray-300 focus:bg-gray focus:outline-none focus:shadow-outline">
              Meine Datensätze
            </a>
          </Link>
          <h1 className="text-4xl my-4">Schulwegrechner</h1>
          <InfoBox>
            <h1 className="font-bold">Info</h1>
            <p>Das ist eine Infobox</p>
          </InfoBox>

          <h1 className="text-xl">
            Wie viele Kilometer bist du in dieser Woche mit welchem
            Verkehrsmittel zur Schule gefahren?
          </h1>
          <form
            className="p-4 max-w-xl m-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* <label className="text-gray-600 font-medium">Zeitpunkt</label>
            <input
              className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
              type="datetime-local"
              name={'timestamp'}
              // defaultValue={new Date().toJSON().slice(0, 19)}
              autoFocus
              {...register('timestamp')}
            /> */}

            {Mobilities.map(m => (
              <React.Fragment key={m.title}>
                <label className="text-gray-600 font-medium">{m.title}</label>
                <input
                  className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
                  type="number"
                  name={m.title}
                  defaultValue={0}
                  min={0}
                  max={1000}
                  {...register(m.type, { min: 0, max: 50 })}
                />
              </React.Fragment>
            ))}

            <button
              className="mt-4 w-full text-mobility-darkest bg-mobility-light px-4 py-2 text-sm font-semibold rounded-lg md:mt-0 hover:bg-gray-300 focus:bg-gray focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={uploadLoading}
            >
              Speichern
            </button>
          </form>
        </main>
      </div>
    </Layout>
  );
};

export default Mobilitaet;
