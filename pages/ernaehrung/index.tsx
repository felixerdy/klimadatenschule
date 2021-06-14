import React, { useState } from 'react';
import Layout from '../../components/Layout';
import SectionHeader from '../../components/SectionHeader';
import InfoBox from '../../components/InfoBox';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { TrashIcon, ExternalLinkIcon } from '@heroicons/react/outline';

type ErnaehrungInstance = {
  co2: number;
  units: number;
};

const Ernaehrung: React.FC = () => {
  const { register, watch, handleSubmit } = useForm<any>();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [meals, setMeals] = useState(1);

  const onSubmit = async data => {
    setUploadLoading(true);
    try {
      console.log(data);
      const formData = new FormData();
      formData.append('pkw', data.pkw);
      formData.append('bahn', data.bahn);
      formData.append('bus', data.bus);
      formData.append('ubahn', data.ubahn);
      formData.append('fahrrad', data.fahrrad);
      formData.append('fuss', data.fuss);

      const response = await fetch('/api/ernaehrung', {
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
        <SectionHeader color="nutrition" text="Ernährung" />
        <main className="mt-20 text-center">
          <Link href={'/ernaehrung/my'}>
            <a className="text-nutrition-darkest bg-nutrition-light px-4 py-2 mt-2  text-sm font-semibold rounded-lg md:mt-0 hover:bg-nutrition focus:bg-gray focus:outline-none focus:shadow-outline">
              Meine Datensätze
            </a>
          </Link>
          <h1 className="text-4xl my-4">Ernährungsrechner</h1>
          <InfoBox>
            <h1 className="font-bold">Info</h1>
            <p>Das ist eine Infobox</p>
          </InfoBox>

          <h1 className="text-xl">
            Welche Mahlzeiten wurden in der Schulkantine ausgegeben?
          </h1>
          <p>
            Besuche den{' '}
            <a
              href="https://www.klimatarier.com/de/CO2_Rechner"
              target="_blank"
              rel="noopener noreferrer"
            >
              CO₂-Rechner der Klimatarier
            </a>{' '}
            und erstelle die Gerichte aus eurer Schulkantine. Übertrage die CO₂
            Werte in die Eingabefelder auf dieser Seite.
          </p>
          <a
            href="https://www.klimatarier.com/de/CO2_Rechner"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-nutrition-darkest bg-nutrition-light px-4 py-2 mt-2 text-sm font-semibold rounded-lg md:mt-0 hover:bg-nutrition focus:bg-gray focus:outline-none focus:shadow-outline"
          >
            CO₂-Rechner der Klimatarier{' '}
            <ExternalLinkIcon className="w-4"></ExternalLinkIcon>
          </a>

          <hr className="my-8"></hr>

          <form
            className="p-4 max-w-md m-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            {Array.from(Array(meals).keys()).map((m, i) => (
              <React.Fragment key={i}>
                <label className="text-gray-600 font-medium">
                  Gericht {i + 1}
                </label>
                <div className="flex flex-row">
                  <input
                    className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
                    type="number"
                    name={`meal_${i}`}
                    defaultValue={0}
                    min={0}
                    {...register(`meal_${i}`, { min: 0 })}
                  />
                  {meals > 1 && (
                    <button
                      className="m-4 text-nutrition-darkest bg-nutrition-lightest px-4 py-2 text-sm font-semibold rounded-lg md:mt-0 hover:bg-nutrition-light focus:bg-gray focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={() => setMeals(meals - 1)}
                    >
                      <TrashIcon className="w-4"></TrashIcon>
                    </button>
                  )}
                </div>
              </React.Fragment>
            ))}

            <button
              className="m-4 text-nutrition-darkest bg-nutrition-lightest px-4 py-2 text-sm font-semibold rounded-lg md:mt-0 hover:bg-nutrition-light focus:bg-gray focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => setMeals(meals + 1)}
            >
              Gericht hinzufügen
            </button>

            <button
              className="mt-4 w-full text-nutrition-darkest bg-nutrition-light px-4 py-2 text-sm font-semibold rounded-lg md:mt-0 hover:bg-nutrition focus:bg-gray focus:outline-none focus:shadow-outline"
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

export default Ernaehrung;
