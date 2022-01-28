import React, { useState } from 'react';
import Layout from '../../components/Layout';
import SectionHeader from '../../components/SectionHeader';
import InfoBox from '../../components/InfoBox';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { Column, useTable } from 'react-table';
import { IPaperForm, PaperDescription, PaperType } from '../../types/paper';
import { useSession } from 'next-auth/client';
import FlexSplitLayout from '../../components/Layouts/FlexSplitLayout';
import PapierIcon from '../../public/images/kds-icon-papier.svg';
import Image from 'next/image';
import { paperToCO2 } from '../../tools';
import LoginCheck from '../../components/LoginCheck';

export const PaperProducts: PaperDescription[] = [
  {
    type: 'a4',
    title: 'Heft A4 (16 Blatt)',
    thgpst: 84.62361599304732
  },
  {
    type: 'a4_recycling',
    title: 'Heft A4 (16 Blatt Recycling)',
    thgpst: 70.73256959418861
  },
  {
    type: 'a5',
    title: 'Heft A5 (16 Blatt)',
    thgpst: 42.31180799652366
  },
  {
    type: 'a5_recycling',
    title: 'Heft A5 (16 Blatt Recycling)',
    thgpst: 35.366284797094305
  },
  {
    type: 'a6',
    title: 'Heft A6 (32 Blatt)',
    thgpst: 42.31180799652366
  },
  {
    type: 'a6_recycling',
    title: 'Heft A6 (32 Blatt Recycling)',
    thgpst: 35.366284797094305
  },
  {
    type: 'collegeblock',
    title: 'Collegeblock (80 Blatt)',
    thgpst: 423.1180799652366
  },
  {
    type: 'collegeblock_recycling',
    title: 'Collegeblock (80 Blatt Recycling)',
    thgpst: 353.66284797094305
  },
  {
    type: 'zeichenmappe',
    title: 'Zeichenmappe A3 (20 Blatt)',
    thgpst: 211.5590399826183
  },
  {
    type: 'zeichenmappe_recycling',
    title: 'Zeichenmappe A3 (20 Blatt Recycling)',
    thgpst: 176.831423985471
  },
  {
    type: 'kopierpapier',
    title: 'Kopierpapier A4 (500 Blatt)',
    thgpst: 2644.487999782729
  },
  {
    type: 'kopierpapier_recycling',
    title: 'Kopierpapier A4 (500 Blatt Recycling)',
    thgpst: 2210.392799818394
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
  const { register, watch, handleSubmit, reset } = useForm<IPaperForm>({
    defaultValues: {
      a4: 0,
      a4_recycling: 0,
      a5: 0,
      a5_recycling: 0,
      a6: 0,
      a6_recycling: 0,
      collegeblock: 0,
      collegeblock_recycling: 0,
      zeichenmappe: 0,
      zeichenmappe_recycling: 0,
      kopierpapier: 0,
      kopierpapier_recycling: 0
    }
  });

  const [uploadLoading, setUploadLoading] = useState(false);

  const [session, loading] = useSession();

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
        toast.success('Datensatz erfolgreich hochgeladen', {
          onClose: () => setUploadLoading(false)
        });
        reset();
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

  const inputData = watch();

  const co2sum = React.useMemo(() => {
    return Object.keys(inputData)
      .filter(e => e !== 'timestamp')
      .reduce(
        (acc, val) =>
          Number(acc) + Number(paperToCO2(inputData[val], val as PaperType)),
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
            col2: paperToCO2(inputData[e], e as PaperType).toFixed(2)
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
        Header: 'Gramm CO₂',
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
        <main className="my-20">
          <FlexSplitLayout>
            <h1 className="flex-1 text-4xl">Papier</h1>
            <div className="flex-1">
              <div className="max-w-xs">
                <Image src={PapierIcon} alt="Papier Icon"></Image>
              </div>
            </div>
          </FlexSplitLayout>
          <FlexSplitLayout>
            <div className="flex-1"></div>
            <div className="flex-1">
              <h1 className="text-4xl my-8 md:w-1/2">
                Papierverbrauch im Klima-Check
              </h1>
              <p>
                Wie viele Papierprodukte wurden von den befragten Schüler*innen
                im letzten Halbjahr genutzt? Gebt die Antworten von jeder
                befragten Person einzeln ein und speichert sie ab.
              </p>
              <br />
              <p>
                Wie viel Kopierpapier wurde in eurer Schule im letzten Halbjahr
                verbraucht? Achtung! Eventuell habt ihr die Daten für ein ganzes
                Schuljahr erhalten. Teilt sie dann durch 2, bevor ihr sie
                eintragt.
              </p>
            </div>
          </FlexSplitLayout>
          <FlexSplitLayout>
            <div className="flex-1"></div>
            <div className="flex-1">
              <p>
                Ihr möchtet nochmal nachlesen, wie genau ihr die Daten sammeln
                könnt beziehungsweise was es zu beachten gibt?{' '}
                <a
                  href="https://klimadatenschule.de/papier.php"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold underline"
                >
                  Hier geht's zu einer Schritt-für-Schritt-Anleitung.
                </a>
              </p>
            </div>
          </FlexSplitLayout>
          <FlexSplitLayout>
            <div className="flex-1"></div>
            <div className="flex-1">
              <p>
                Ihr möchtet wissen, wie und auf welcher Datengrundlage die Werte
                berechnet werden?{' '}
                <Link href={'/quellen#papier'} passHref>
                  <a className="font-semibold underline">
                    Hier geht's zu den Quellen
                  </a>
                </Link>
              </p>
            </div>
          </FlexSplitLayout>
          <FlexSplitLayout>
            <div className="flex-1"></div>
            <div className="flex-1 max-w-full">
              <hr className="my-4"></hr>

              <form onSubmit={handleSubmit(onSubmit)}>
                {PaperProducts.map(m => (
                  <div className="mb-4" key={m.title}>
                    <input
                      className={`border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700 ${
                        m.type === 'kopierpapier' && 'mt-8'
                      }`}
                      type="number"
                      name={m.title}
                      defaultValue={0}
                      min={0}
                      max={1000}
                      {...register(m.type, { min: 0, max: 50 })}
                    />
                    <label className="font-medium">{m.title}</label>
                  </div>
                ))}

                <LoginCheck>
                  <Link href={'/papier/my'}>
                    <a className="bg-kds-green-neon rounded-full p-3 m-4 text-sm font-semibold hover:bg-nutrition-light focus:bg-gray focus:outline-none focus:shadow-outline">
                      Meine Datensätze
                    </a>
                  </Link>

                  <button
                    className="bg-kds-green-neon rounded-full p-3 m-4 text-sm font-semibold hover:bg-nutrition-light focus:bg-gray focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={!session || uploadLoading}
                  >
                    Speichern
                  </button>
                </LoginCheck>
              </form>

              <hr className="mt-4 mb-16"></hr>

              <table
                {...getTableProps()}
                className="w-full md:max-w-full md:min-w-full table-fixed break-words"
              >
                <thead className="">
                  {headerGroups.map(headerGroup => (
                    <tr
                      key={headerGroup.id}
                      {...headerGroup.getHeaderGroupProps()}
                    >
                      {headerGroup.headers.map((column, i) => (
                        <th
                          key={column.id}
                          {...column.getHeaderProps()}
                          className={`${
                            i === 0 && 'pr-3'
                          } text-left font-medium  uppercase tracking-wider`}
                        >
                          {column.render('Header')}
                        </th>
                      ))}
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={2}>
                      <hr className="my-4"></hr>
                    </td>
                  </tr>
                </thead>
                <tbody {...getTableBodyProps()} className="">
                  {rows.map(row => {
                    prepareRow(row);
                    return (
                      <tr key={row.id} {...row.getRowProps()}>
                        {row.cells.map((cell, i) => {
                          return (
                            <td
                              key={i}
                              {...cell.getCellProps()}
                              className={`${
                                cell.value === 'Kopierpapier A4 (500 Blatt)'
                                  ? 'pt-10 pb-4'
                                  : 'py-4'
                              }`}
                            >
                              {cell.render('Cell')}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan={2}>
                      <hr className="my-4"></hr>
                    </td>
                  </tr>
                </tbody>
                <tfoot className="">
                  {footerGroups.map(group => (
                    <tr key={group.id} {...group.getFooterGroupProps()}>
                      {group.headers.map(column => (
                        <td
                          key={column.id}
                          className="py-4 whitespace-nowrap font-semibold"
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
          </FlexSplitLayout>
        </main>

        {/* <SectionHeader color="paper" text="Papier" /> */}
        {/* <main className="mt-20 text-center">
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
                className="mt-4 w-full text-mobility-darkest bg-mobility-light px-4 py-2 text-sm font-semibold rounded-lg md:mt-0 hover:bg-gray-300 focus:bg-gray focus:outline-none focus:shadow-outline disabled:bg-gray-200 disabled:text-gray-500"
                type="submit"
                disabled={!session || uploadLoading}
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
        </main> */}
      </div>
    </Layout>
  );
};

export default Papier;
