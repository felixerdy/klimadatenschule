import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Image from 'next/image';

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

  const [fromColor, setFromColor] = useState('from-blue-100');
  const [toColor, setToColor] = useState('to-blue-300');
  const [textColor, setTextColor] = useState('text-blue-900');
  const [bgColor, setBgColor] = useState('bg-blue-100');
  const [bgColorHover, setBgColorHover] = useState('bg-blue');

  // useEffect(() => {
  //   // https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
  //   switch (dataset) {
  //     case 'tree':
  //       setFromColor(`from-tree-lightest`);
  //       setToColor(`to-tree-light`);
  //       setTextColor(`text-tree-darkest`);
  //       setBgColor(`bg-tree-lightest`);
  //       setBgColorHover(`bg-tree`);
  //       break;
  //     case 'paper':
  //       setFromColor(`from-paper-lightest`);
  //       setToColor(`to-paper-light`);
  //       setTextColor(`text-paper-darkest`);
  //       setBgColor(`bg-paper-lightest`);
  //       setBgColorHover(`bg-paper`);
  //       break;
  //     case 'mobility':
  //       setFromColor(`from-mobility-lightest`);
  //       setToColor(`to-mobility-light`);
  //       setTextColor(`text-mobility-darkest`);
  //       setBgColor(`bg-mobility-lightest`);
  //       setBgColorHover(`bg-mobility`);
  //       break;
  //     case 'nutrition':
  //       setFromColor(`from-nutrition-lightest`);
  //       setToColor(`to-nutrition-light-light`);
  //       setTextColor(`text-nutrition-darkest`);
  //       setBgColor(`bg-nutrition-lightest`);
  //       setBgColorHover(`bg-nutrition`);
  //       break;
  //   }
  // }, [dataset]);

  const onSubmit = async (data: Inputs) => {
    try {
      const format = 'csv';
      const response = await fetch(`/api/dataset/${dataset}?format=${format}`, {
        method: 'GET'
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = downloadRef.current;
      link.href = url;

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

      link.setAttribute(
        'download',
        `kds_${datasetName}_${new Date()
          .toISOString()
          .slice(0, 10)
          .replaceAll('-', '_')}.${data.format}`
      );
      link.click();
      link.href = '';

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
