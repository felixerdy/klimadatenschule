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
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import prisma from '../../lib/prisma';
import { TreeRecord } from '@prisma/client';
import { useRouter } from 'next/router';
import TreeModal from '../../components/Modals/TreeModal';
import DatasetActions from '../../components/DatasetActions';

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
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return { props: { records: [] } };
  }

  const records = await prisma.treeRecord.findMany({
    where: {
      user: { email: session.user.email }
    }
  });

  return {
    props: { records }
  };
};

const WaldBaum: React.FC<{ records: TreeRecord[] }> = props => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<TreeRecord | null>(null);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 400,
    latitude: 52,
    longitude: 9,
    zoom: 5
  });

  const [popupInfo, setPopupInfo] = useState<TreeRecord>(null);

  function closeModal() {
    setSelectedRecord(null);
    setOpened(false);
  }

  function openModal(record) {
    setSelectedRecord(record);
    setOpened(true);
  }

  const deleteRecord = async (record: TreeRecord) => {
    try {
      const response = await fetch(`/api/tree/${record.id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success('Datensatz erfolgreich gelöscht!');
        // Refresh server side props
        // https://www.joshwcomeau.com/nextjs/refreshing-server-side-props/
        router.replace(router.asPath);

        // Close Popup of deleted tree
        setPopupInfo(null);
      } else {
        toast.error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="page text-center">
        <SectionHeader color="green" text="Wald & Bäume" />
        <main className="mt-20">
          <div className="shadow overflow-hidden border-gray-200 rounded-lg">
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

              {popupInfo && (
                <Popup
                  tipSize={5}
                  anchor="bottom"
                  offsetTop={-40}
                  longitude={popupInfo.longitude}
                  latitude={popupInfo.latitude}
                  closeOnClick={false}
                  onClose={setPopupInfo}
                >
                  <div className="p-1">
                    <p>Umfang: {popupInfo.diameter} cm</p>
                    <p>Höhe: {popupInfo.height} m</p>
                  </div>
                  <div className="flex pt-2">
                    <DatasetActions
                      record={popupInfo}
                      deleteRecord={deleteRecord}
                      openRecord={openModal}
                    ></DatasetActions>
                  </div>
                </Popup>
              )}

              {props.records.map(m => (
                <Marker
                  key={m.id}
                  latitude={m.latitude}
                  longitude={m.longitude}
                  offsetLeft={-20}
                  offsetTop={-40}
                >
                  <Image
                    draggable={false}
                    src="/images/tree-marker.svg"
                    width={40}
                    height={40}
                    onClick={() => setPopupInfo(m)}
                  ></Image>
                </Marker>
              ))}
            </ReactMapGL>
          </div>
        </main>
        {selectedRecord && (
          <TreeModal
            opened={opened}
            record={selectedRecord}
            closeModal={closeModal}
          ></TreeModal>
        )}
      </div>
    </Layout>
  );
};

export default WaldBaum;
