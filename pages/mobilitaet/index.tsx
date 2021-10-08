import React, { useState } from 'react';
import Layout from '../../components/Layout';
import SectionHeader from '../../components/SectionHeader';
import InfoBox from '../../components/InfoBox';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { Column, useTable } from 'react-table';
import {
  IMobilityForm,
  MobilityDescription,
  MobilityType
} from '../../types/mobility';
import { useSession } from 'next-auth/client';

import Button from '../../components/ui/Button';
import FlexSplitLayout from '../../components/Layouts/FlexSplitLayout';
import MobilitaetIcon from '../../public/images/kds-icon-mobilitaet.svg';
import Image from 'next/image';
import LoginCheck from '../../components/LoginCheck';

// https://www.umweltbundesamt.de/themen/verkehr-laerm/emissionsdaten#grafik
export const Mobilities: MobilityDescription[] = [
  {
    type: 'pkw',
    title: 'Auto',
    thgpkm: 154
  },
  {
    type: 'bahn',
    title: 'Zug',
    thgpkm: 54
  },
  {
    type: 'bus',
    title: 'Bus',
    thgpkm: 83
  },
  {
    type: 'ubahn',
    title: 'S-Bahn / U-Bahn',
    thgpkm: 54
  },
  {
    type: 'fahrrad',
    title: 'Fahrrad',
    thgpkm: 0
  },
  {
    type: 'fuss',
    title: 'zu Fuß',
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
  const { register, watch, handleSubmit } = useForm<IMobilityForm>({
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

  const [session, loading] = useSession();

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
        toast.success('Datensatz erfolgreich hochgeladen', {
          onClose: () => setUploadLoading(false)
        });
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
    [inputData]
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Verkehrsmittel',
        accessor: 'col1',
        Footer: 'SUMME'
      },
      {
        Header: 'Kilogramm CO₂',
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
        <FlexSplitLayout>
          <h1 className="flex-1 text-4xl">Mobilität</h1>
          <div className="flex-1">
            <div className="max-w-xs">
              <Image src={MobilitaetIcon} alt="Mobilität Icon"></Image>
            </div>
          </div>
        </FlexSplitLayout>
        <FlexSplitLayout>
          <div className="flex-1"></div>
          <div className="flex-1">
            <h1 className="text-4xl my-16 w-1/2">Mobilität im Klima-Check</h1>
            <p>
              Wie viele Kilometer legst du mit folgenden Fortbewegungsmitteln
              auf deinem Schulweg pro Tag zurück? Gib die Daten für eine ganze
              Woche ein.
            </p>
          </div>
        </FlexSplitLayout>
        <FlexSplitLayout>
          <div className="flex-1"></div>
          <div className="flex-1">
            <p>
              Ihr möchtet nochmal nachlesen, wie genau ihr die Daten sammeln
              könnt beziehungsweise was es zu beachten gibt?{' '}
              <a href="#" className="font-semibold underline">
                Hier geht’s zu einer Schritt für Schritt Anleitung.
              </a>
            </p>
          </div>
        </FlexSplitLayout>
        <FlexSplitLayout>
          <div className="flex-1"></div>
          <div className="flex-1 max-w-full">
            <hr className="my-4"></hr>
            <table {...getTableProps()} className="max-w-full md:min-w-full">
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
                          i === 0 ? 'pr-3' : ''
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
                            className="py-4 whitespace-nowrap"
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
            <hr className="mt-4 mb-16"></hr>

            <form className="" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <input
                  className="border-solid border-gray-300 border py-2 px-4 w-full rounded "
                  type="date"
                  name={'timestamp'}
                  defaultValue={new Date().toJSON().slice(0, 10)}
                  {...register('timestamp')}
                />
                <label className="font-medium">Tag</label>
              </div>

              {Mobilities.map(m => (
                <div className="mb-4" key={m.title}>
                  <input
                    className="border-solid border-gray-300 border py-2 px-4  w-full rounded "
                    type="number"
                    name={m.title}
                    defaultValue={0}
                    min={0}
                    max={1000}
                    {...register(m.type, { min: 0, max: 50 })}
                  />
                  <label className="mb-4 font-medium">{m.title}</label>
                </div>
              ))}

              <LoginCheck>
                <Link href={'/mobilitaet/my'}>
                  <a className="bg-kds-green-neon rounded-full p-3 m-4 text-sm font-semibold hover:bg-nutrition-light focus:bg-gray focus:outline-none focus:shadow-outline">
                    Meine Datensätze
                  </a>
                </Link>
                <Button type="submit" disabled={!session || uploadLoading}>
                  Speichern
                </Button>
              </LoginCheck>
            </form>
          </div>
        </FlexSplitLayout>
      </div>
    </Layout>
  );
};

export default Mobilitaet;
