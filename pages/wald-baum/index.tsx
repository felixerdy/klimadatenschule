import React, { useState } from 'react';
import Layout from '../../components/Layout';
import SectionHeader from '../../components/SectionHeader';
import { useGeolocation } from 'react-use';
import ReactMapGL, {
  GeolocateControl,
  NavigationControl,
  Marker,
  Popup
} from 'react-map-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Coordinate } from 'react-map-gl/src/components/draggable-control';
import Image from 'next/image';
import { ChevronUpIcon, TrashIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Link from 'next/link';
import prisma from '../../lib/prisma';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/client';
import FlexSplitLayout from '../../components/Layouts/FlexSplitLayout';
import BaumIcon from '../../public/images/kds-icon-baeume.svg';
import { PlusIcon, XIcon } from '@heroicons/react/solid';
import Button from '../../components/ui/Button';
import { treeToCO2 } from '../../tools';
import LoginCheck from '../../components/LoginCheck';
import { Disclosure, Transition } from '@headlessui/react';
import { TreeInfo } from '../../components/InfoText/tree';
import Warning from '../../components/Warning';

interface TreeMarker {
  id: string;
  position: Coordinate;
  circumference: number;
  height: number;
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const records = await prisma.treeRecord.findMany({
    select: {
      circumference: true,
      height: true,
      latitude: true,
      longitude: true,
      id: true
    }
  });

  const trees: TreeMarker[] = records.map(t => ({
    id: t.id,
    position: [t.longitude, t.latitude],
    circumference: t.circumference,
    height: t.height
  }));

  return {
    props: { trees }
  };
};

const WaldBaum: React.FC<{ trees: TreeMarker[] }> = ({ trees }) => {
  const [uploadLoading, setUploadLoading] = useState(false);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 600,
    latitude: 52,
    longitude: 9,
    zoom: 5
  });

  const [markers, setMarkers] = useState<TreeMarker[]>([]);
  const { register, watch, handleSubmit, reset } = useForm<any>();

  const geolocation = useGeolocation();
  const [popupInfo, setPopupInfo] = useState<TreeMarker>(null);

  const [session, loading] = useSession();

  const addMarker = () => {
    const position = geolocation.latitude ? geolocation : viewport;

    setMarkers([
      ...markers,
      {
        id: String(markers.length),
        position: [position.longitude, position.latitude],
        circumference: 0,
        height: 0
      }
    ]);
  };

  const removeMarker = (id: string) => {
    setMarkers(markers.filter(m => m.id !== id));
  };

  interface IUpdateMarkerArgs {
    lngLat?: Coordinate;
    circumference?: number;
    height?: number;
  }
  const updateMarker = (
    id: String,
    { lngLat, circumference, height }: IUpdateMarkerArgs
  ) => {
    const newMarkers = markers.map(m => {
      if (m.id === id) {
        return {
          ...m,
          position: lngLat || m.position,
          circumference,
          height
        };
      }
      return m;
    });
    setMarkers(newMarkers);
  };

  const onSubmit = async data => {
    setUploadLoading(true);
    console.log(data);
    try {
      const formData = new FormData();

      markers.forEach(m => {
        formData.append(`tree_${m.id}_latitude`, String(m.position[1]));
        formData.append(`tree_${m.id}_longitude`, String(m.position[0]));
        formData.append(
          `tree_${m.id}_circumference`,
          data[`tree_${m.id}_circumference`]
        );
        formData.append(`tree_${m.id}_height`, data[`tree_${m.id}_height`]);
      });

      // for (let key in data) {
      //   if (data.hasOwnProperty(key)) {
      //     formData.append(key, data[key]);
      //   }
      // }

      console.log(formData);

      const response = await fetch('/api/tree', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        toast.success('Datensatz erfolgreich hochgeladen', {
          onClose: () => setUploadLoading(false)
        });
        reset();
        setMarkers([]);
      } else {
        toast.error(`Error: ${response.statusText}`, {
          onClose: () => setUploadLoading(false)
        });
      }
    } catch (error) {
      console.error(error);
      setUploadLoading(false);
    } finally {
      // setUploadLoading(false);
    }
  };

  return (
    <Layout>
      <div className="page">
        <FlexSplitLayout>
          <h1 className="flex-1 text-4xl">Bäume</h1>
          <div className="flex-1">
            <div className="max-w-xs">
              <Image src={BaumIcon} alt="Papier Icon"></Image>
            </div>
          </div>
        </FlexSplitLayout>
        <FlexSplitLayout>
          <div className="flex-1"></div>
          <div className="flex-1">
            <h1 className="text-4xl my-8 md:w-1/2">Bäume im Klima-Check</h1>
            <p>
              Wie viele Bäume gibt es in eurer Umgebung und wie viel CO₂
              <a href="#co2-notice">*</a> speichern sie? Kartiert alle Bäume,
              indem ihr den Standort auf der Karte markiert und Umfang sowie
              Höhe des Baumes in die Eingabefelder eintragt.
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
                href="https://klimadatenschule.de/baeume.php"
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
              <Link href={'/quellen#baeume'} passHref>
                <a className="font-semibold underline">
                  Hier geht&apos;s zu den Quellen
                </a>
              </Link>
            </p>
            <div className="my-4 bg-white rounded-lg p-4">
              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-tree-darker bg-tree-light rounded-lg hover:bg-tree-lighter focus:outline-none focus-visible:ring focus-visible:ring-mobility focus-visible:ring-opacity-75">
                      <span>Formel zur CO₂-Berechnung</span>
                      <ChevronUpIcon
                        className={`${
                          open ? 'transform rotate-180' : ''
                        } w-5 h-5 text-tree-darker`}
                      />
                    </Disclosure.Button>
                    <Transition
                      enter="transition duration-100 ease-out"
                      enterFrom="transform scale-95 opacity-0"
                      enterTo="transform scale-100 opacity-100"
                      leave="transition duration-75 ease-out"
                      leaveFrom="transform scale-100 opacity-100"
                      leaveTo="transform scale-95 opacity-0"
                    >
                      <Disclosure.Panel className="px-4 pt-4 pb-2">
                        <TreeInfo />
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            </div>
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
            <div className="shadow overflow-hidden border-gray-200 rounded-lg mt-4">
              <ReactMapGL
                {...viewport}
                onViewportChange={nextViewport => setViewport(nextViewport)}
                mapStyle={{
                  version: 8,
                  metadata: {
                    'mapbox:autocomposite': true,
                    'mapbox:type': 'template'
                  },
                  sources: {
                    'raster-tiles': {
                      type: 'raster',
                      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                      tileSize: 256
                    }
                  },
                  layers: [
                    {
                      id: 'simple-tiles',
                      type: 'raster',
                      source: 'raster-tiles',
                      minzoom: 0,
                      maxzoom: 22
                    }
                  ]
                }}
              >
                <NavigationControl
                  style={{
                    right: 10,
                    top: 50
                  }}
                />
                <GeolocateControl
                  style={{
                    right: 10,
                    top: 10
                  }}
                  positionOptions={{ enableHighAccuracy: true }}
                  auto
                />

                {trees.map(m => (
                  <Marker
                    key={m.id}
                    latitude={m.position[1]}
                    longitude={m.position[0]}
                    offsetLeft={-20}
                    offsetTop={-40}
                  >
                    <Image
                      alt="Tree Marker"
                      className="filter grayscale"
                      draggable={false}
                      src="/images/tree-marker.svg"
                      width={40}
                      height={40}
                      onClick={() => setPopupInfo(m)}
                    ></Image>
                  </Marker>
                ))}
                {markers.map(m => (
                  <Marker
                    key={m.id}
                    latitude={m.position[1]}
                    longitude={m.position[0]}
                    offsetLeft={-20}
                    offsetTop={-40}
                    draggable
                    onDragEnd={evt =>
                      updateMarker(m.id, { lngLat: evt.lngLat })
                    }
                  >
                    <Image
                      alt="Tree Marker"
                      draggable={false}
                      src="/images/tree-marker.svg"
                      width={40}
                      height={40}
                    ></Image>
                  </Marker>
                ))}
                {popupInfo && (
                  <Popup
                    tipSize={5}
                    anchor="bottom"
                    offsetTop={-40}
                    longitude={popupInfo.position[0]}
                    latitude={popupInfo.position[1]}
                    closeOnClick={false}
                    onClose={setPopupInfo}
                  >
                    <div className="p-1">
                      <p>Umfang: {popupInfo.circumference} m</p>
                      <p>Höhe: {popupInfo.height} m</p>
                    </div>
                  </Popup>
                )}
              </ReactMapGL>
            </div>
            <form className="" onSubmit={handleSubmit(onSubmit)}>
              {markers.map((m, i) => (
                <>
                  <hr className="my-4 w-full"></hr>
                  <div key={m.id} className="flex w-full">
                    <div className="flex w-full">
                      {trees.length > 1 && (
                        <div className="mr-2">
                          <button
                            className="bg-kds-green-neon rounded-full p-3 text-sm font-semibold hover:bg-nutrition-light focus:bg-gray focus:outline-none focus:shadow-outline"
                            type="button"
                            onClick={() => removeMarker(m.id)}
                          >
                            <XIcon className="w-4"></XIcon>
                          </button>
                        </div>
                      )}
                      <div className="flex flex-col w-full">
                        <div className="mb-4 ">
                          {watch(`tree_${m.id}_circumference`) > 10 && (
                            <Warning />
                          )}
                          <input
                            className="border-solid border-gray-300 border py-2 px-4 w-full rounded "
                            type="number"
                            step="any"
                            name={`tree_${i}_circumference`}
                            defaultValue={0}
                            max={20}
                            min={0.0001}
                            {...register(`tree_${m.id}_circumference`)}
                          />
                          <label className="">
                            Umfang in m (auf 1,30m Höhe)
                          </label>
                        </div>
                        <div className="mb-4 ">
                          {watch(`tree_${m.id}_height`) > 25 && <Warning />}
                          <input
                            className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
                            type="number"
                            step="any"
                            name={`tree_${i}_height`}
                            defaultValue={0}
                            min={0.0001}
                            max={70}
                            {...register(`tree_${m.id}_height`, {
                              min: 0.0001
                            })}
                          />
                          <label className="">Höhe in m</label>
                        </div>
                        <div className="mb-4 ">
                          <label className="">
                            {treeToCO2(
                              Number(watch(`tree_${m.id}_circumference`)) ?? 0,
                              Number(watch(`tree_${m.id}_height`)) ?? 0
                            ).toFixed(2)}{' '}
                            kg gespeichertes CO₂<a href="#co2-notice">*</a>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
              <hr className="my-4"></hr>
              <div
                className="flex items-center group cursor-pointer"
                onClick={() => addMarker()}
              >
                <button
                  className="bg-kds-green-neon rounded-full p-3 text-sm font-semibold group-hover:bg-nutrition-light focus:bg-gray focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
                <p className="ml-2 uppercase">Baum hinzufügen</p>
              </div>
              <hr className="my-4"></hr>
              {/* <button
                className="m-4 text-tree-darkest bg-tree-light px-4 py-2 text-sm font-semibold rounded-lg hover:bg-tree-lightest focus:bg-tree focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => addMarker()}
              >
                + Baum hinzufügen
              </button> */}
              <LoginCheck>
                <Link href={'/wald-baum/my'}>
                  <a className="bg-kds-green-neon rounded-full p-3 m-4 text-sm font-semibold hover:bg-nutrition-light focus:bg-gray focus:outline-none focus:shadow-outline">
                    Meine Datensätze
                  </a>
                </Link>

                <Button type="submit" disabled={!session || uploadLoading}>
                  Speichern
                </Button>
              </LoginCheck>
            </form>
            <br />
            <p id="co2-notice">
              * Der in den Bäumen gespeicherte Kohlenstoff kann mit einem Faktor
              von 3,67 zu CO₂ umgerechnet werden (1 kg C entspricht 3,67 kg
              CO₂).
            </p>
          </div>
        </FlexSplitLayout>
      </div>
    </Layout>
  );
};

export default WaldBaum;
