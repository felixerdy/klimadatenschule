import React, { useState } from 'react';
import Layout from '../../components/Layout';
import SectionHeader from '../../components/SectionHeader';
import InfoBox from '../../components/InfoBox';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { TrashIcon, XIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/client';

import Image from 'next/image';

import ErnaehrungIcon from '../../public/images/kds-icon-ernaehrung.svg';
import FlexSplitLayout from '../../components/Layouts/FlexSplitLayout';

import { PlusIcon } from '@heroicons/react/solid';
import LoginCheck from '../../components/LoginCheck';

const Ernaehrung: React.FC = () => {
  const { register, watch, handleSubmit, reset } = useForm<any>();
  const [uploadLoading, setUploadLoading] = useState(false);

  const [meals, setMeals] = useState(1);

  const [session, loading] = useSession();

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
        reset();
        setMeals(1);
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
        <main className="my-20">
          <FlexSplitLayout>
            <h1 className="flex-1 text-4xl">Ernährung</h1>
            <div className="flex-1">
              <div className="max-w-xs">
                <Image src={ErnaehrungIcon} alt="Ernährung Icon"></Image>
              </div>
            </div>
          </FlexSplitLayout>
          <FlexSplitLayout>
            <div className="flex-1"></div>
            <div className="flex-1">
              <p>
                Wie viele Mahlzeiten verkauft eure Mensa in einer Woche?
                Ermittelt den CO₂-Fußabdruck der einzelnen Gerichte mit dem
                Klimatarier-Rechner.
              </p>
              <p className="my-4">
                <a
                  // href="https://www.klimatarier.com/de/CO2_Rechner"
                  href="https://web.archive.org/web/20210816152126/https://www.klimatarier.com/de/CO2_Rechner"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-kds-green-neon px-4 py-2 text-sm font-semibold rounded-full hover:bg-gray-300"
                >
                  CO₂-RECHNER DER KLIMATARIER
                </a>
              </p>
              <p>
                Übertragt die CO₂-Werte in die untenstehenden Eingabefelder.
                Erstellt für jedes Gericht <b>pro Tag eine Woche lang</b> einen
                eigenen Eintrag.
              </p>
            </div>
          </FlexSplitLayout>
          <FlexSplitLayout>
            <div className="flex-1"></div>
            <div className="flex-1">
              <p>
                Ihr möchtet nochmal nachlesen, wie genau ihr die Daten sammeln
                könnt beziehungsweise was es zu beachten gibt?{' '}
                <a
                  href="https://klimadatenschule.de/ernaehrung.php"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold underline"
                >
                  Hier geht&apos;s zu einer Schritt-für-Schritt-Anleitung.
                </a>
              </p>
            </div>
          </FlexSplitLayout>
          <FlexSplitLayout>
            <div className="flex-1"></div>
            <div className="flex-1">
              <p>
                Ihr möchtet wissen, wie und auf welcher Datengrundlage die Werte
                berechnet werden?{' '}
                <Link href={'/quellen#ernaehrung'} passHref>
                  <a className="font-semibold underline">
                    Hier geht&apos;s zu den Quellen
                  </a>
                </Link>
              </p>
            </div>
          </FlexSplitLayout>
          <FlexSplitLayout>
            <div className="flex-1"></div>
            <div className="flex-1">
              {/* @ts-ignore */}
              {session && session?.user.organisationId === null && (
                <Link href={'/auth/complete-signup'} passHref>
                  <div className="w-full p-4 bg-yellow-300 font-semibold text-center rounded-full cursor-pointer">
                    <a>Bitte eine Schule auswählen →</a>
                  </div>
                </Link>
              )}
              <hr className="my-4" />
              <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                  <input
                    className="border-solid border-gray-300 border py-2 px-4 w-full rounded "
                    type="date"
                    name={'timestamp'}
                    defaultValue={new Date().toJSON().slice(0, 10)}
                    {...register('timestamp')}
                  />
                  <label className="font-medium">Tag</label>
                </div>
                <hr className="my-4" />
                {Array.from(Array(meals).keys()).map((m, i) => (
                  <React.Fragment key={i}>
                    <div className="flex flex-row w-full">
                      <div className="flex w-full">
                        {meals > 1 && (
                          <div className="mr-2">
                            <button
                              className="bg-kds-green-neon rounded-full p-3 text-sm font-semibold hover:bg-nutrition-light focus:bg-gray focus:outline-none focus:shadow-outline"
                              type="button"
                              onClick={() => setMeals(meals - 1)}
                            >
                              <XIcon className="w-4"></XIcon>
                            </button>
                          </div>
                        )}
                        <div className="flex flex-col w-full">
                          <div className="flex flex-col">
                            {!watch(`meal_${i}_name`) && (
                              <label className="text-gray-800">
                                Beschreibe hier das Gericht mit möglichst vielen
                                Zutaten, das erleichtert den Vergleich mit
                                anderen Gerichten.
                              </label>
                            )}
                            <input
                              className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                              type="text"
                              name={`meal_${i}_name`}
                              placeholder={`Gericht ${i + 1}`}
                              required
                              {...register(`meal_${i}_name`, {
                                required: true
                              })}
                            />
                            <label className=" font-bold">Name</label>
                          </div>
                          <div className="flex flex-col">
                            <input
                              className="border-solid border-gray-300 border py-2 px-4 mt-4 w-full rounded text-gray-700"
                              type="number"
                              step="any"
                              name={`meal_${i}_co2`}
                              defaultValue={0}
                              min={0}
                              {...register(`meal_${i}_co2`, { min: 0 })}
                            />
                            <label className=" font-bold">CO₂ in kg</label>
                          </div>
                          <div className="flex flex-col">
                            <input
                              className="border-solid border-gray-300 border py-2 px-4 mt-4 w-full rounded text-gray-700"
                              type="number"
                              step="any"
                              name={`meal_${i}_count`}
                              defaultValue={1}
                              min={1}
                              {...register(`meal_${i}_count`, { min: 1 })}
                            />
                            <label className="font-bold">
                              Anzahl der Portionen
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4"></hr>
                  </React.Fragment>
                ))}

                {meals < 10 && (
                  <div className="w-full">
                    <div
                      className="flex items-center group cursor-pointer"
                      onClick={() => setMeals(meals + 1)}
                    >
                      <button
                        className="bg-kds-green-neon rounded-full p-3 text-sm font-semibold group-hover:bg-nutrition-light focus:bg-gray focus:outline-none focus:shadow-outline"
                        type="button"
                      >
                        <PlusIcon className="w-5 h-5" />
                      </button>
                      <p className="ml-2 uppercase">Gericht hinzufügen</p>
                    </div>
                    <hr className="my-4"></hr>
                  </div>
                )}

                <LoginCheck>
                  <Link href={'/ernaehrung/my'}>
                    <a className="bg-kds-green-neon rounded-full p-3 m-4 text-sm font-semibold hover:bg-nutrition-light focus:bg-gray focus:outline-none focus:shadow-outline">
                      Meine Datensätze
                    </a>
                  </Link>

                  <button
                    className="bg-kds-green-neon rounded-full p-3 m-4 text-sm font-semibold hover:bg-nutrition-light focus:bg-gray focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={!session || uploadLoading}
                  >
                    Speichern
                  </button>
                </LoginCheck>
              </form>
              <div className="mt-8 p-8 bg-white rounded-lg overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/ernaehrung/lernreise-ernaehrung.png"
                  alt="lernreise grafik"
                  className="rounded overflow-hidden"
                />
                <br />
                <p>
                  Die Lernreise basiert auf den Daten des „Schools for
                  Earth“-Klimarechner von Greenpeace e. V.
                </p>
                <br />
                <p>
                  Die Berechnung erfolgt in CO₂-Äquivalenten, da im Bereich
                  Ernährung auch Methan und Lachgas ausgestoßen werden.
                </p>
                <br />
                <p>
                  Die Einsparwerte ergeben sich durch den Wechsel von einem
                  fleischhaltigen zu einem veganen/vegetarischen Gericht an zwei
                  Tagen pro Woche.
                </p>
                <br />
                <p>
                  Weitere Informationen zur Berechnung findest du{' '}
                  <a
                    className="font-semibold underline"
                    href="https://klimadatenschule.de/media/site/2f2f57ec5b-1680012640/klimadatenschule_material_zu_ernaehrung.pdf"
                  >
                    hier
                  </a>
                  .
                </p>
              </div>
            </div>
          </FlexSplitLayout>
        </main>
      </div>
    </Layout>
  );
};

export default Ernaehrung;
