import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Image from 'next/image';

import { utils, writeFile } from 'xlsx';
import { DARRDICHTE_KG_M3, UMRECHNUNGSFAKTOR } from '../tools';
import { Mobilities } from '../pages/mobilitaet';
import { PaperProducts } from '../pages/papier';

type Inputs = {
  format: string;
};

type CardProps = {
  dataset: string;
  title: string;
  image: any;
  entries?: number;
};

const Card: React.FC<CardProps> = ({ dataset, image, title, entries = 0 }) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const downloadRef = useRef(null);

  const onSubmit = async (data: Inputs) => {
    try {
      const format = data.format ?? 'xlsx';
      const response = await fetch(`/api/dataset/${dataset}?format=${format}`, {
        method: 'GET'
      });

      let datasetName = 'kds';
      switch (dataset) {
        case 'tree': {
          datasetName = 'baeume';
          break;
        }
        case 'mobility': {
          datasetName = 'mobilitaet';
          break;
        }
        case 'paper': {
          datasetName = 'papier';
          break;
        }
        case 'nutrition': {
          datasetName = 'ernaehrung';
          break;
        }
      }

      if (format === 'xlsx') {
        const data = await response.json();
        if (data.length > 0) {
          // convert dates to date objects
          let wsData = data.map((e, i) => {
            const record = {
              ...e,
              erstellt_am: new Date(e.erstellt_am),
              bearbeitet_am: new Date(e.bearbeitet_am)
            };

            if (dataset === 'tree') {
              record.radius_in_m = { t: 'n', f: `A${i + 2}/(2*PI())` };
              record.volumen_in_m3 = {
                t: 'n',
                f: `PI()*H${i + 2}*H${i + 2}*B${i + 2}`
              };
              record.masse_in_kg = {
                t: 'n',
                f: `I${i + 2}*${DARRDICHTE_KG_M3}`
              };
              record.kohlenstoffgehalt = {
                t: 'n',
                f: `J${i + 2}*0.5`
              };
              record.co2_in_kg = {
                t: 'n',
                f: `K${i + 2}*${UMRECHNUNGSFAKTOR}`
              };
            }

            if (dataset === 'mobility') {
              record.pkw_co2_in_kg = {
                t: 'n',
                f: `A${i + 2} * ${
                  Mobilities.find(m => m.type === 'pkw').thgpkm / 1000
                }`
              };
              record.bahn_co2_in_kg = {
                t: 'n',
                f: `B${i + 2} * ${
                  Mobilities.find(m => m.type === 'bahn').thgpkm / 1000
                }`
              };
              record.bus_co2_in_kg = {
                t: 'n',
                f: `C${i + 2} * ${
                  Mobilities.find(m => m.type === 'bus').thgpkm / 1000
                }`
              };
              record.ubahn_co2_in_kg = {
                t: 'n',
                f: `D${i + 2} * ${
                  Mobilities.find(m => m.type === 'ubahn').thgpkm / 1000
                }`
              };
              record.fahrrad_co2_in_kg = {
                t: 'n',
                f: `E${i + 2} * ${
                  Mobilities.find(m => m.type === 'fahrrad').thgpkm / 1000
                }`
              };
              record.zu_fuss_co2_in_kg = {
                t: 'n',
                f: `F${i + 2} * ${
                  Mobilities.find(m => m.type === 'fuss').thgpkm / 1000
                }`
              };
              record.co2_in_kg = {
                t: 'n',
                f: `K${i + 2} + L${i + 2} + M${i + 2} + N${i + 2} + O${
                  i + 2
                } + P${i + 2}`
              };
            }

            if (dataset === 'paper') {
              PaperProducts.forEach((p, j) => {
                record[`${p.type}_co2_in_g`] = {
                  t: 'n',
                  f: `${(j + 10).toString(36).toUpperCase()}${i + 2} * ${
                    p.thgpst
                  }`
                };
              });
              record.frischfaser_co2_in_g = {
                t: 'n',
                f: `P${i + 2} + R${i + 2} + T${i + 2} + V${i + 2} + X${
                  i + 2
                } + Z${i + 2}`
              };
              record.recycling_co2_in_g = {
                t: 'n',
                f: `Q${i + 2} + S${i + 2} + U${i + 2} + W${i + 2} + Y${
                  i + 2
                } + AA${i + 2}`
              };
              record.co2_in_g = {
                t: 'n',
                f: `AB${i + 2} + AC${i + 2}`
              };
            }

            if (dataset === 'nutrition') {
              record.co2_in_kg_gesamt = { t: 'n', f: `B${i + 2}*C${i + 2}` };
            }

            if (dataset === 'mobility' || dataset === 'nutrition') {
              record.datum = new Date(e.datum);
            }

            return record;
          });
          const wb = utils.book_new();
          const ws = utils.json_to_sheet(wsData);
          utils.book_append_sheet(wb, ws);
          writeFile(
            wb,
            `kds_${datasetName}_${new Date()
              .toISOString()
              .slice(0, 10)
              .replaceAll('-', '_')}.${format}`
          );

          return;
        }
      } else {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = downloadRef.current;
        link.href = url;

        link.setAttribute(
          'download',
          `kds_${datasetName}_${new Date()
            .toISOString()
            .slice(0, 10)
            .replaceAll('-', '_')}.${format}`
        );
        link.click();
        link.href = '';
      }

      if (response.ok) {
        toast.success('Datensatz erfolgreich runtergeladen');
      } else {
        toast.error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log('finally');
    }
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow-lg bg-white w-56 m-1">
      <div className="flex flex-col items-center">
        <div className="w-48 p-4 relative flex items-center">
          <Image src={image} alt="" width="180" height="180" />
        </div>
        <form className="p-6 text-center" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-3xl uppercase">{title}</h1>
          <p>
            {entries} {entries !== 1 ? 'Einträge' : 'Eintrag'}
          </p>

          <div className="my-4">
            <input
              type="radio"
              name="format"
              value="xlsx"
              id={`${dataset}_excel`}
              checked
              {...register('format')}
            />
            <label htmlFor={`${dataset}_excel`} className="m-2">
              Excel
            </label>
            <br />
            <input
              type="radio"
              name="format"
              value="csv"
              id={`${dataset}_csv`}
              {...register('format')}
            />
            <label htmlFor={`${dataset}_csv`} className="m-2">
              CSV
            </label>
          </div>

          <button
            className="bg-kds-green-neon mt-8 px-4 py-2 text-sm font-semibold rounded-full hover:bg-gray-300 focus:bg-gray focus:outline-none focus:shadow-outline self-center"
            type="submit"
          >
            Download
          </button>

          <a ref={downloadRef} className="invisible" />
        </form>
      </div>
    </div>
  );
};
export default Card;
