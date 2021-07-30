import React, { useState } from 'react';
import Layout from '../../components/Layout';
import SectionHeader from '../../components/SectionHeader';
import InfoBox from '../../components/InfoBox';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Link from 'next/link';
import Router from 'next/dist/next-server/server/router';
import { Column, useTable } from 'react-table';
import { IPaperForm, PaperDescription, PaperType } from '../../types/paper';

const toCO2 = (gram: number, type: PaperType): number => {
  return Number(
    (gram / 1000) * PaperProducts.find(e => e.type === type).thgpkm
  );
};

export const PaperProducts: PaperDescription[] = [
  {
    type: 'a4',
    title: 'Heft A4',
    thgpkm: 0.1
  },
  {
    type: 'a5',
    title: 'Heft A5',
    thgpkm: 0.05
  },
  {
    type: 'a6',
    title: 'Vokabelheft / Hausaufgabenheft A6',
    thgpkm: 0.0025
  },
  {
    type: 'collegeblock',
    title: 'Collegeblock',
    thgpkm: 0.4
  },
  {
    type: 'zeichenmappe',
    title: 'Zeichenmappe A3',
    thgpkm: 0.2
  }
];

interface TableObject {
  col1: string;
  col2: string;
}

const Papier: React.FC = () => {
  // Set defaultValues to render table on page load
  // First render of watch will return undefined because it is called before register
  // https://react-hook-form.com/api/useform/watch
  const { register, watch, handleSubmit } = useForm<IPaperForm>({
    defaultValues: {
      a4: 0,
      a5: 0,
      a6: 0,
      collegeblock: 0,
      zeichenmappe: 0
    }
  });

  const [uploadLoading, setUploadLoading] = useState(false);

  const onSubmit = async (data: IPaperForm) => {
    setUploadLoading(true);
    try {
      const formData = new FormData();

      console.log(data);

      for (let key in data) {
        formData.append(key, data[key]);
      }

      const response = await fetch('/api/paper', {
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
          Number(acc) + Number(toCO2(inputData[val], val as PaperType)),
        0
      );
  }, [inputData]);

  const data = React.useMemo(
    () => [
      ...Object.keys(inputData)
        .filter(e => e !== 'timestamp')
        .map(e => {
          return {
            col1: PaperProducts.find(n => n.type === e).title,
            col2: toCO2(inputData[e], e as PaperType).toFixed(2)
          };
        })
    ],
    [inputData]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Papierprodukt',
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
        <SectionHeader color="paper" text="Papier" />
        <main className="mt-20 text-center">
          <Link href={'/papier/my'}>
            <a className="text-paper-darkest bg-paper-light px-4 py-2 mt-2  text-sm font-semibold rounded-lg md:mt-0 hover:bg-gray-300 focus:bg-gray focus:outline-none focus:shadow-outline">
              Meine Datensätze
            </a>
          </Link>
          <h1 className="text-4xl my-4">Papier</h1>
          <InfoBox>
            <h1 className="font-bold">Info</h1>
            <p>Das ist eine Infobox</p>
          </InfoBox>

          <h1 className="text-xl">
            Wie viele Papierprodukte hast du in diesem Halbjahr genutzt?
          </h1>
          <div className="flex items-center justify-evenly flex-col-reverse sm:flex-row">
            <form
              className="p-4 max-w-xl m-auto"
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* <label className="text-gray-600 font-medium">Zeitpunkt</label>
              <input
                className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
                type="datetime-local"
                name={'timestamp'}
                // defaultValue={new Date().toJSON().slice(0, 19)}
                autoFocus
                {...register('timestamp')}
              /> */}

              {PaperProducts.map(m => (
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
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map(column => (
                        <th
                          key={column.id}
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
                      <tr key={row.id} {...row.getRowProps()}>
                        {row.cells.map((cell, i) => {
                          return (
                            <td
                              key={i}
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
                    <tr key={group.id} {...group.getFooterGroupProps()}>
                      {group.headers.map(column => (
                        <td
                          key={column.id}
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

export default Papier;
