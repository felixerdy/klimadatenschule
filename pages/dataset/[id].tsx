import React, { useEffect, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import Router from 'next/router';
import { DatasetProps } from '../../components/Post';
import { useSession } from 'next-auth/client';
import prisma from '../../lib/prisma';
import axios from 'axios';
import csv from 'csvtojson';
import { useTable } from 'react-table';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const dataset = await prisma.dataset.findUnique({
    where: {
      id: (params?.id as string) || ''
    },
    include: {
      publisher: {
        select: { name: true, email: true }
      }
    }
  });
  if (dataset) {
    const file = await axios.get(
      `${process.env.BUCKET_BASEURL}${dataset.filepath}`
    );
    const csvAsJson = await csv().fromString(file.data);
    return {
      props: {
        ...dataset,
        data: csvAsJson
      }
    };
  } else {
    return { props: {} };
  }
};

async function deleteDataset(id: number): Promise<void> {
  await fetch(`/api/dataset/${id}`, {
    method: 'DELETE'
  });
  Router.push('/');
}

const Dataset: React.FC<DatasetProps> = props => {
  const [session, loading] = useSession();
  if (loading) {
    return <div>Authenticating ...</div>;
  }

  if (Object.keys(props).length === 0) {
    return <div>Nout found</div>;
  }

  const userHasValidSession = Boolean(session);
  const datasetBelongsToUser = session?.user?.email === props.publisher?.email;
  let title = props.title;

  const data = React.useMemo(() => props.data, [props.data]);

  const columns = React.useMemo(
    () =>
      Array.from(new Set(...props.data.map(r => Object.keys(r)))).map(h => ({
        Header: h,
        accessor: h
      })),
    [props.data]
  );

  console.log(columns);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({ columns, data });

  return (
    <Layout>
      <div>
        <h2 className="text-gray-800 text-4xl">{title}</h2>
        <p>By {props?.publisher?.name || 'Unknown author'}</p>
      </div>
      {datasetBelongsToUser && (
        <div className="my-4">
          <button
            onClick={() => deleteDataset(props.id)}
            className={`text-white bg-red-700 px-4 py-2 mt-2 text-sm font-semibold rounded-lg md:mt-0 hover:bg-red-900 focus:bg-gray focus:outline-none focus:shadow-outline`}
          >
            Datensatz löschen
          </button>
        </div>
      )}
      <div className="shadow overflow-scroll sm:overflow-auto border-b border-gray-200 sm:rounded-lg">
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
        </table>
      </div>
    </Layout>
  );
};

export default Dataset;
