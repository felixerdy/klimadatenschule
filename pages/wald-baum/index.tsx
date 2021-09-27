import React, { useState } from 'react';
import Layout from '../../components/Layout';
import SectionHeader from '../../components/SectionHeader';
import { useGeolocation } from 'react-use';
import ReactMapGL, { GeolocateControl, Marker, Popup } from 'react-map-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Coordinate } from 'react-map-gl/src/components/draggable-control';
import Image from 'next/image';
import { TrashIcon } from '@heroicons/react/outline';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Link from 'next/link';
import prisma from '../../lib/prisma';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/client';

interface TreeMarker {
  id: string;
  position: Coordinate;
  diameter: number;
  height: number;
}

const geolocateControlStyle = {
  right: 10,
  top: 10
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const records = await prisma.treeRecord.findMany({
    select: {
      diameter: true,
      height: true,
      latitude: true,
      longitude: true,
      id: true
    }
  });

  const trees: TreeMarker[] = records.map(t => ({
    id: t.id,
    position: [t.longitude, t.latitude],
    diameter: t.diameter,
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
  const { register, watch, handleSubmit } = useForm<any>();

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
        diameter: 0,
        height: 0
      }
    ]);
  };

  const removeMarker = (id: string) => {
    setMarkers(markers.filter(m => m.id !== id));
  };

  interface IUpdateMarkerArgs {
    lngLat?: Coordinate;
    diameter?: number;
    height?: number;
  }
  const updateMarker = (
    id: String,
    { lngLat, diameter, height }: IUpdateMarkerArgs
  ) => {
    const newMarkers = markers.map(m => {
      if (m.id === id) {
        return {
          ...m,
          position: lngLat || m.position,
          diameter,
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
        formData.append(`tree_${m.id}_diameter`, data[`tree_${m.id}_diameter`]);
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
      <div className="page text-center">
        <SectionHeader color="green" text="Wald & Bäume" />
        <main className="mt-20">
          <Link href={'/wald-baum/my'}>
            <a className="text-tree-darkest bg-tree-light px-4 py-2 m-4 text-sm font-semibold rounded-lg hover:bg-tree-lightest focus:bg-gray focus:outline-none focus:shadow-outline">
              Meine Datensätze
            </a>
          </Link>
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
              <GeolocateControl
                style={geolocateControlStyle}
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
                  onDragEnd={evt => updateMarker(m.id, { lngLat: evt.lngLat })}
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
                    <p>Umfang: {popupInfo.diameter} cm</p>
                    <p>Höhe: {popupInfo.height} m</p>
                  </div>
                </Popup>
              )}
            </ReactMapGL>
          </div>
          <div className="m-4">
            <form
              className="p-4 max-w-xl m-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              {markers.map((m, i) => (
                <div key={m.id} className="flex items-center content-center">
                  {/* <p>Baum {i + 1}</p> */}
                  <div className="flex-grow flex items-center content-center">
                    <Image
                      alt="Tree Marker"
                      className="shadow"
                      draggable={false}
                      src="/images/tree-marker.svg"
                      width={40}
                      height={40}
                    ></Image>
                    <div className="flex flex-col m-auto">
                      <label className="text-gray-600">Umfang in cm</label>
                      <input
                        className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
                        type="number"
                        step="any"
                        name={`tree_${i}_diameter`}
                        defaultValue={0}
                        min={0}
                        {...register(`tree_${m.id}_diameter`, { min: 0 })}
                      />
                    </div>
                    <div className="flex flex-col m-auto">
                      <label className="text-gray-600">Höhe in m</label>
                      <input
                        className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
                        type="number"
                        step="any"
                        name={`tree_${i}_height`}
                        defaultValue={0}
                        min={0}
                        {...register(`tree_${m.id}_height`, { min: 0 })}
                      />
                    </div>
                  </div>
                  <button
                    className="w-8 h-8 text-tree-darkest bg-tree-lightest px-2 py-2 text-sm font-semibold rounded-lg md:mt-0 hover:bg-tree-light focus:bg-gray focus:outline-none focus:shadow-outline"
                    type="button"
                    onClick={() => removeMarker(m.id)}
                  >
                    <TrashIcon className="w-4"></TrashIcon>
                  </button>
                </div>
              ))}
              <button
                className="m-4 text-tree-darkest bg-tree-light px-4 py-2 text-sm font-semibold rounded-lg hover:bg-tree-lightest focus:bg-tree focus:outline-none focus:shadow-outline"
                type="button"
                onClick={() => addMarker()}
              >
                + Baum hinzufügen
              </button>
              <button
                className="m-4 w-full text-tree-darkest bg-tree-light px-4 py-2 text-sm font-semibold rounded-lg hover:bg-tree-lightest focus:bg-gray focus:outline-none focus:shadow-outline disabled:bg-gray-200 disabled:text-gray-500"
                type="submit"
                disabled={!session || uploadLoading}
              >
                Speichern
              </button>
            </form>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default WaldBaum;
