import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { useSession } from 'next-auth/client';
import Image from 'next/image';
import { Column, useTable } from 'react-table';

import { useForm } from 'react-hook-form';

type Inputs = {
  timestamp: Date;
  beef: number;
  chicken: number;
  pork: number;
  fish: number;
  veggie: number;
  tofu: number;
};

type NutritionCategory =
  | 'beef'
  | 'chicken'
  | 'pork'
  | 'fish'
  | 'veggie'
  | 'tofu';

type NutritionType = {
  name: NutritionCategory;
  title: string;
  co2kg: number;
};

const Nutritions: NutritionType[] = [
  {
    name: 'beef',
    title: '🐄 Rindfleisch',
    co2kg: 13.6
  },
  {
    name: 'chicken',
    title: '🐓 Hähnchen',
    co2kg: 5.5
  },
  {
    name: 'pork',
    title: '🐖 Schwein',
    co2kg: 4.6
  },
  {
    name: 'fish',
    title: '🐟 Fisch',
    co2kg: 2.4
  },
  {
    name: 'veggie',
    title: '🥦 Gemüsenugget',
    co2kg: 1.3
  },
  {
    name: 'tofu',
    title: 'Tofu',
    co2kg: 1
  }
];

interface TableObject {
  col1: string;
  col2: string;
}

const toCO2 = (gram: number, category: NutritionCategory): number => {
  return Number(
    (gram / 1000) * Nutritions.find(e => e.name === category).co2kg
  );
};

const NutritionCalculator: React.FC = () => {
  const [session] = useSession();

  const { register, watch, handleSubmit } = useForm<Inputs>();

  const onSubmit = data => console.log(data);

  const inputData = watch();

  const co2sum = React.useMemo(() => {
    return Object.keys(inputData)
      .filter(e => e !== 'timestamp')
      .reduce(
        (acc, val) =>
          Number(acc) + Number(toCO2(inputData[val], val as NutritionCategory)),
        0
      );
  }, [inputData]);

  const data = React.useMemo(
    () => [
      ...Object.keys(inputData)
        .filter(e => e !== 'timestamp')
        .map(e => {
          return {
            col1: Nutritions.find(n => n.name === e).title,
            col2: toCO2(inputData[e], e as NutritionCategory).toFixed(2)
          };
        })
    ],
    [inputData, co2sum]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Lebensmittel',
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

  if (!session) {
    return (
      <Layout>
        <div>You need to be authenticated to view this page.</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page">
        <h1 className="text-gray-800 text-4xl font-extrabold">
          Ernährungsrechner
        </h1>
        <main className="mt-12">
          <h1 className="text-center text-4xl font-semibold mt-10">
            Das habe ich gegessen
          </h1>
          <div className="text-center">
            <Image
              className="m-auto"
              src="/images/undraw_diet_ghvw.svg"
              alt="Picture of the author"
              width={400}
              height={400}
            ></Image>
          </div>
          <div className="flex items-center justify-evenly flex-col-reverse sm:flex-row">
            <form className="p-4 max-w-xl" onSubmit={handleSubmit(onSubmit)}>
              <label className="text-gray-600 font-medium">Zeitpunkt</label>
              <input
                className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
                type="datetime-local"
                name={'timestamp'}
                // defaultValue={new Date().toJSON().slice(0, 19)}
                autoFocus
                {...register('timestamp')}
              />
              {Nutritions.map(n => (
                <React.Fragment key={n.name}>
                  <label className="text-gray-600 font-medium">
                    {n.title} in Gramm
                  </label>
                  <input
                    className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
                    type="number"
                    name={n.name}
                    defaultValue={0}
                    min={0}
                    max={1000}
                    autoFocus
                    {...register(n.name, { min: 0, max: 1000 })}
                  />
                </React.Fragment>
              ))}

              <button
                className="mt-4 w-full bg-indigo-800 hover:bg-indigo-600 text-indigo-100 border py-3 px-6 font-semibold text-md rounded"
                type="submit"
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

export default NutritionCalculator;
