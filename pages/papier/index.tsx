import React, { useState } from 'react';
import Layout from '../../components/Layout';
import SectionHeader from '../../components/SectionHeader';
import InfoBox from '../../components/InfoBox';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Router from 'next/dist/next-server/server/router';

type Inputs = {
  timestamp?: Date;
  a4: number;
  a5: number;
  a6: number;
  collegeblock: number;
  zeichenmappe: number;
};

type PaperDescription = {
  type: 'a4' | 'a5' | 'a6' | 'collegeblock' | 'zeichenmappe';
  title: string;
  thgpkm: number;
};

const PaperProducts: PaperDescription[] = [
  {
    type: 'a4',
    title: 'Heft A4',
    thgpkm: 143
  },
  {
    type: 'a5',
    title: 'Heft A5',
    thgpkm: 55
  },
  {
    type: 'a6',
    title: 'Vokabelheft / Hausaufgabenheft A6',
    thgpkm: 88
  },
  {
    type: 'collegeblock',
    title: 'Collegeblock',
    thgpkm: 55
  },
  {
    type: 'zeichenmappe',
    title: 'Zeichenmappe A3',
    thgpkm: 0
  }
];

const Papier: React.FC = () => {
  const { register, watch, handleSubmit } = useForm<Inputs>();

  const [uploadLoading, setUploadLoading] = useState(false);

  const onSubmit = async (data: Inputs) => {
    setUploadLoading(true);
    try {
      const formData = new FormData();

      console.log(data);

      for (let key in data) {
        formData.append(key, data[key]);
      }

      const response = await fetch('/api/paper', {
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

  // const inputData = watch();

  return (
    <Layout>
      <div className="page">
        <SectionHeader color="paper" text="Papier" />
        <main className="mt-20 text-center">
          <Link href={'/papier/my'}>
            <a className="text-paper-darkest bg-paper-light px-4 py-2 mt-2  text-sm font-semibold rounded-lg md:mt-0 hover:bg-gray-300 focus:bg-gray focus:outline-none focus:shadow-outline">
              Meine Datensätze
            </a>
          </Link>
          <h1 className="text-4xl my-4">Papier</h1>
          <InfoBox>
            <h1 className="font-bold">Info</h1>
            <p>Das ist eine Infobox</p>
          </InfoBox>

          <h1 className="text-xl">
            Wie viele Papierprodukte hast du in diesem Schuljahr genutzt?
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

            {PaperProducts.map(m => (
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

export default Papier;
