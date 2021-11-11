import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Image from 'next/image';

import { utils, writeFile } from 'xlsx';

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
          let wsData = data.map(e => {
            const record = {
              ...e,
              createdAt: new Date(e.createdAt),
              updatedAt: new Date(e.updatedAt)
            };

            if (dataset === 'mobility' || dataset === 'nutrition') {
              record.timestamp = new Date(e.timestamp);
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
