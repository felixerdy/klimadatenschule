import React, { Fragment, useState } from 'react';
import { useTable } from 'react-table';

import dynamic from 'next/dynamic';
import { Listbox, Transition } from '@headlessui/react';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface TableProps {
  data: any[];
}

const Table = (props: TableProps) => {
  const data = React.useMemo(() => props.data, [props.data]);

  const columns = React.useMemo(
    () =>
      Array.from(new Set(...props.data.map(r => Object.keys(r)))).map(h => ({
        Header: h,
        accessor: h
      })),
    [props.data]
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const chartTypes = ['line', 'bar'];
  const [chartType, setChartType] = useState<'line' | 'bar'>('bar');
  const [barStacked, setBarStacked] = useState(false);

  return (
    <>
      <div className="shadow overflow-scroll mt-20 sm:overflow-auto border-b border-gray-200 sm:rounded-lg">
        <table
          {...getTableProps()}
          className="min-w-full divide-y divide-gray-200"
        >
          <thead className="bg-gray-50">
            {headerGroups.map((headerGroup, i) => (
              <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, j) => (
                  <th
                    key={j}
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
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={i} {...row.getRowProps()}>
                  {row.cells.map((cell, j) => {
                    return (
                      <td
                        key={j}
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

      <div className="shadow overflow-scroll mt-20 p-4 sm:overflow-auto border-b border-gray-200 sm:rounded-lg">
        <Listbox value={chartType} onChange={setChartType}>
          {({ open }) => (
            <>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                  <span className="block truncate">{chartType}</span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options
                    static
                    className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                  >
                    {chartTypes.map((ct, i) => (
                      <Listbox.Option
                        key={i}
                        className={({ active }) =>
                          `${
                            active
                              ? 'text-amber-900 bg-amber-100'
                              : 'text-gray-900'
                          }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                        }
                        value={ct}
                      >
                        {({ selected, active }) => (
                          <>
                            <span
                              className={`${
                                selected ? 'font-medium' : 'font-normal'
                              } block truncate`}
                            >
                              {ct}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>

        {chartType === 'bar' && (
          <>
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600"
              checked={barStacked}
              onChange={e => setBarStacked(!barStacked)}
            />
            <span className="ml-2 text-gray-700">stacked</span>
          </>
        )}

        <Chart
          className="mt-20"
          options={{
            chart: {
              id: 'basic-bar',
              stacked: barStacked
            },
            dataLabels: {
              enabled: false
            },
            xaxis: {
              categories: Object.keys(data[0]).slice(0, -1)
            }
          }}
          series={data.map(row => {
            const header = Object.keys(row)[Object.keys(row).length - 1];
            const data = Object.values(row)
              .slice(0, -1)
              .map((v: number) => (isNaN(v) ? null : v));

            return {
              name: row[header],
              data
            };
          })}
          key={chartType}
          type={chartType}
          width="100%"
          height="400"
        />
      </div>
    </>
  );
};

export default Table;
