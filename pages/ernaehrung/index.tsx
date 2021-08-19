import React, { useState } from 'react';
import Layout from '../../components/Layout';
import SectionHeader from '../../components/SectionHeader';
import InfoBox from '../../components/InfoBox';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { TrashIcon, ExternalLinkIcon } from '@heroicons/react/outline';

const Ernaehrung: React.FC = () => {
  const { register, watch, handleSubmit } = useForm<any>();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [meals, setMeals] = useState(1);

  const onSubmit = async data => {
    setUploadLoading(true);
    try {
      console.log(data);
      const formData = new FormData();

      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          formData.append(key, data[key]);
        }
      }

      const response = await fetch('/api/meal', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        toast.success('Datensatz erfolgreich hochgeladen', {
          onClose: () => setUploadLoading(false)
        });
      } else {
        toast.error(`Error: ${response.statusText}`, {
          onClose: () => setUploadLoading(false)
        });
      }
    } catch (error) {
      console.error(error);
      setUploadLoading(false);
    } finally {
      // Not sure if we still need this
      // setTimeout(() => {
      //   setUploadLoading(false);
      // }, 5000);
    }
  };

  const inputData = watch();

  return (
    <Layout>
      <div className="page">
        <SectionHeader color="nutrition" text="Ernährung" />
        <main className="mt-20">
          <div className="text-center">
            <Link href={'/ernaehrung/my'}>
              <a className="text-nutrition-darkest bg-nutrition-light px-4 py-2 mt-2  text-sm font-semibold rounded-lg md:mt-0 hover:bg-nutrition focus:bg-gray focus:outline-none focus:shadow-outline">
                Meine Datensätze
              </a>
            </Link>
            <h1 className="text-4xl my-4">Ernährungsrechner</h1>
            <InfoBox>
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
                und erstelle die Gerichte aus eurer Schulkantine. Übertrage die
                CO₂ Werte in die Eingabefelder auf dieser Seite.
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
            </InfoBox>
          </div>

          <form
            className="p-4 max-w-md m-auto"
            onSubmit={handleSubmit(onSubmit)}
          >
            {Array.from(Array(meals).keys()).map((m, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-row items-center">
                  <div className="flex flex-col w-full">
                    <div className="flex flex-col">
                      <label className="text-gray-600 font-bold">Name</label>
                      <input
                        className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
                        type="text"
                        name={`meal_${i}_name`}
                        defaultValue={`Gericht ${i + 1}`}
                        {...register(`meal_${i}_name`, { required: true })}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-600 font-bold">
                        CO2 in kg
                      </label>
                      <input
                        className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
                        type="number"
                        step="any"
                        name={`meal_${i}_co2`}
                        defaultValue={0}
                        min={0}
                        {...register(`meal_${i}_co2`, { min: 0 })}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-gray-600 font-bold">
                        Anzahl der Gerichte
                      </label>
                      <input
                        className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
                        type="number"
                        step="any"
                        name={`meal_${i}_count`}
                        defaultValue={1}
                        min={1}
                        {...register(`meal_${i}_count`, { min: 1 })}
                      />
                    </div>
                    {meals > 1 && <hr className="my-4"></hr>}
                  </div>
                  {meals > 1 && (
                    <button
                      className="m-4 w-12 h-12 text-nutrition-darkest bg-nutrition-lightest px-4 py-2 text-sm font-semibold rounded-lg md:mt-0 hover:bg-nutrition-light focus:bg-gray focus:outline-none focus:shadow-outline"
                      type="button"
                      onClick={() => setMeals(meals - 1)}
                    >
                      <TrashIcon className="w-4"></TrashIcon>
                    </button>
                  )}
                </div>
              </React.Fragment>
            ))}

            {meals < 10 && (
              <div className="w-full text-center">
                <button
                  className="m-4 text-nutrition-darkest bg-nutrition-lightest px-4 py-2 text-sm font-semibold rounded-lg md:mt-0 hover:bg-nutrition-light focus:bg-gray focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={() => setMeals(meals + 1)}
                >
                  Gericht hinzufügen
                </button>
              </div>
            )}

            <button
              className="mt-4 w-full text-nutrition-darkest bg-nutrition-light px-4 py-2 text-sm font-semibold rounded-lg md:mt-0 hover:bg-nutrition focus:bg-gray focus:outline-none focus:shadow-outline disabled:bg-gray-200 disabled:text-gray-500"
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
