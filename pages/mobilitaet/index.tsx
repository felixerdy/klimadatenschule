import React, { useState } from 'react';
import Layout from '../../components/Layout';
import SectionHeader from '../../components/SectionHeader';
import InfoBox from '../../components/InfoBox';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { Column, useTable } from 'react-table';

type Inputs = {
  timestamp: Date;
  pkw: number;
  bahn: number;
  bus: number;
  ubahn: number;
  fahrrad: number;
  fuss: number;
};

type MobilityType = 'pkw' | 'bahn' | 'bus' | 'ubahn' | 'fahrrad' | 'fuss';

type MobilityDescription = {
  type: MobilityType;
  title: string;
  thgpkm: number;
};

const Mobilities: MobilityDescription[] = [
  {
    type: 'pkw',
    title: '🚙 PKW',
    thgpkm: 143
  },
  {
    type: 'bahn',
    title: '🚂 Eisenbahn',
    thgpkm: 55
  },
  {
    type: 'bus',
    title: '🚌 Bus',
    thgpkm: 88
  },
  {
    type: 'ubahn',
    title: '🚋 S-Bahn / U-Bahn',
    thgpkm: 55
  },
  {
    type: 'fahrrad',
    title: '🚴 Fahrrad',
    thgpkm: 0
  },
  {
    type: 'fuss',
    title: '🚶 zu Fuß',
    thgpkm: 0
  }
];

interface TableObject {
  col1: string;
  col2: string;
}

const toCO2 = (gram: number, type: MobilityType): number => {
  return Number((gram / 1000) * Mobilities.find(e => e.type === type).thgpkm);
};

const Mobilitaet: React.FC = () => {
  // Set defaultValues to render table on page load
  // First render of watch will return undefined because it is called before register
  // https://react-hook-form.com/api/useform/watch
  const { register, watch, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      pkw: 0,
      bahn: 0,
      bus: 0,
      ubahn: 0,
      fahrrad: 0,
      fuss: 0
    }
  });

  const [uploadLoading, setUploadLoading] = useState(false);

  const onSubmit = async data => {
    setUploadLoading(true);
    try {
      const formData = new FormData();
      formData.append('pkw', data.pkw);
      formData.append('bahn', data.bahn);
      formData.append('bus', data.bus);
      formData.append('ubahn', data.ubahn);
      formData.append('fahrrad', data.fahrrad);
      formData.append('fuss', data.fuss);
      formData.append('timestamp', data.timestamp);

      const response = await fetch('/api/mobility', {
        method: 'POST',
        body: formData
      });

      if (response.ok) {
        toast.success('Datensatz erfolgreich hochgeladen');
      } else {
        toast.error(`Error: ${response.statusText}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setUploadLoading(false);
    }
  };

  const inputData = watch();

  const co2sum = React.useMemo(() => {
    return Object.keys(inputData)
      .filter(e => e !== 'timestamp')
      .reduce(
        (acc, val) =>
          Number(acc) + Number(toCO2(inputData[val], val as MobilityType)),
        0
      );
  }, [inputData]);

  const data = React.useMemo(
    () => [
      ...Object.keys(inputData)
        .filter(e => e !== 'timestamp')
        .map(e => {
          return {
            col1: Mobilities.find(n => n.type === e).title,
            col2: toCO2(inputData[e], e as MobilityType).toFixed(2)
          };
        })
    ],
    [inputData, co2sum]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Verkehrsmittel',
        accessor: 'col1',
        Footer: 'SUMME'
      },
      {
        Header: 'Kilogramm CO2',
        accessor: 'col2',
        Footer: info => {
          // Only calculate total visits if rows change
          const total = React.useMemo(
            () =>
              info.rows
                .reduce(
                  (acc, { values: { col1, col2 } }) =>
                    Number(acc) + Number(col2),
                  0
                )
                .toFixed(2),
            [info.rows]
          );

          return total;
        }
      }
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow
  } = useTable<TableObject>({
    // @ts-ignore
    columns,
    // @ts-ignore
    data
  });

  return (
    <Layout>
      <div className="page">
        <SectionHeader color="mobility" text="Mobilität" />
        <main className="mt-20 text-center">
          <Link href={'/mobilitaet/my'}>
            <a className="text-mobility-darkest bg-mobility-light px-4 py-2 mt-2  text-sm font-semibold rounded-lg md:mt-0 hover:bg-gray-300 focus:bg-gray focus:outline-none focus:shadow-outline">
              Meine Datensätze
            </a>
          </Link>
          <h1 className="text-4xl my-4">Schulwegrechner</h1>
          <InfoBox>
            <h1 className="font-bold">Info</h1>
            <p>Das ist eine Infobox</p>
          </InfoBox>

          <h1 className="text-xl">
            Wie viele <span className="font-bold">Kilometer</span> bist du mit
            welchem Verkehrsmittel zur Schule gefahren? Achte darauf, dass du
            den Hin- und Rückweg berechnest.
          </h1>
          <div className="flex items-center justify-evenly flex-col-reverse sm:flex-row">
            <form
              className="p-4 max-w-xl m-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              <label className="text-gray-600 font-medium">Tag</label>
              <input
                className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
                type="date"
                name={'timestamp'}
                defaultValue={new Date().toJSON().slice(0, 10)}
                autoFocus
                {...register('timestamp')}
              />

              {Mobilities.map(m => (
                <React.Fragment key={m.title}>
                  <label className="text-gray-600 font-medium">{m.title}</label>
                  <input
                    className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
                    type="number"
                    name={m.title}
                    defaultValue={0}
                    min={0}
                    max={1000}
                    {...register(m.type, { min: 0, max: 50 })}
                  />
                </React.Fragment>
              ))}

              <button
                className="mt-4 w-full text-mobility-darkest bg-mobility-light px-4 py-2 text-sm font-semibold rounded-lg md:mt-0 hover:bg-gray-300 focus:bg-gray focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={uploadLoading}
              >
                Speichern
              </button>
            </form>
            <div className="max-w-xl shadow overflow-scroll mt-20 sm:overflow-auto border-b border-gray-200 sm:rounded-lg">
              <table
                {...getTableProps()}
                className="min-w-full divide-y divide-gray-200"
              >
                <thead className="bg-gray-50">
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th
                          {...column.getHeaderProps()}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          {column.render('Header')}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  {...getTableBodyProps()}
                  className="bg-white divide-y divide-gray-200"
                >
                  {rows.map(row => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                          return (
                            <td
                              {...cell.getCellProps()}
                              className="px-6 py-4 whitespace-nowrap"
                            >
                              {cell.render('Cell')}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="bg-white divide-y divide-gray-200">
                  {footerGroups.map(group => (
                    <tr {...group.getFooterGroupProps()}>
                      {group.headers.map(column => (
                        <td
                          className="px-6 py-4 whitespace-nowrap font-semibold"
                          {...column.getFooterProps()}
                        >
                          {column.render('Footer')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tfoot>
              </table>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default Mobilitaet;
