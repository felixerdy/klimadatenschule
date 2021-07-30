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
  image: string;
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

  useEffect(() => {
    // https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
    switch (dataset) {
      case 'tree':
        setFromColor(`from-tree-lightest`);
        setToColor(`to-tree-light`);
        setTextColor(`text-tree-darkest`);
        setBgColor(`bg-tree-lightest`);
        setBgColorHover(`bg-tree`);
        break;
      case 'paper':
        setFromColor(`from-paper-lightest`);
        setToColor(`to-paper-light`);
        setTextColor(`text-paper-darkest`);
        setBgColor(`bg-paper-lightest`);
        setBgColorHover(`bg-paper`);
        break;
      case 'mobility':
        setFromColor(`from-mobility-lightest`);
        setToColor(`to-mobility-light`);
        setTextColor(`text-mobility-darkest`);
        setBgColor(`bg-mobility-lightest`);
        setBgColorHover(`bg-mobility`);
        break;
      case 'nutrition':
        setFromColor(`from-nutrition-lightest`);
        setToColor(`to-nutrition-light-light`);
        setTextColor(`text-nutrition-darkest`);
        setBgColor(`bg-nutrition-lightest`);
        setBgColorHover(`bg-nutrition`);
        break;
    }
  }, [dataset]);

  const onSubmit = async (data: Inputs) => {
    try {
      const response = await fetch(
        `/api/dataset/${dataset}?format=${data.format}`,
        {
          method: 'GET'
        }
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = downloadRef.current;
      link.href = url;
      link.setAttribute(
        'download',
        `${dataset}_${new Date()
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
    <div
      className={`w-full rounded-2xl overflow-hidden shadow-lg group bg-gradient-to-br ${fromColor} ${toColor}`}
    >
      <div className="flex">
        <div className="flex-none w-48 p-4 relative flex items-center">
          <Image
            src={`/images/kds-icon-${image}.png`}
            alt=""
            width="180"
            height="180"
          />
        </div>
        <form className="flex-auto p-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap">
            <h1 className="flex-auto text-xl font-semibold">{title}</h1>
            <div className="text-xl font-semibold text-gray-500">
              {entries} {entries !== 1 ? 'Einträge' : 'Eintrag'}
            </div>
          </div>
          <div className="flex items-baseline mt-4 mb-6">
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="format"
                  value="csv"
                  defaultChecked
                  {...register('format')}
                />
                <span className="ml-2">CSV</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="format"
                  value="json"
                  {...register('format')}
                />
                <span className="ml-2">JSON</span>
              </label>
            </div>
          </div>
          <div className="flex space-x-3 mb-4 text-sm font-medium mt-10">
            <div className="flex-auto flex space-x-3">
              <button
                className={`w-full ${textColor} ${bgColor} px-4 py-2 mt-2 text-sm font-semibold rounded-lg md:mt-0 hover:${bgColorHover} focus:bg-gray focus:outline-none focus:shadow-outline`}
                type="submit"
              >
                Download
              </button>
              <a ref={downloadRef} className="invisible" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Card;
