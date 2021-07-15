import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

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
        `${dataset}-${new Date().toLocaleDateString()}.${data.format}`
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
      className={`w-full rounded-2xl overflow-hidden shadow-lg group bg-gradient-to-br from-${dataset}-lightest to-${dataset}-light`}
    >
      <div className="flex">
        <div className="flex-none w-48 relative flex items-center">
          <img src={`/images/kds-icon-${image}.png`} alt="" className="p-4" />
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
                <span className="ml-2">Json</span>
              </label>
            </div>
          </div>
          <div className="flex space-x-3 mb-4 text-sm font-medium mt-10">
            <div className="flex-auto flex space-x-3">
              <button
                className={`w-full text-${dataset}-darkest bg-${dataset}-lightest px-4 py-2 mt-2 text-sm font-semibold rounded-lg md:mt-0 hover:bg-${dataset} focus:bg-gray focus:outline-none focus:shadow-outline`}
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
