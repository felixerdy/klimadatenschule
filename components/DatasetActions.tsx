import {
  MealRecord,
  PaperRecord,
  MobilityRecord,
  TreeRecord
} from '@prisma/client';
import React, { useState } from 'react';

type RecordType = PaperRecord | TreeRecord | MobilityRecord | MealRecord;

interface Props {
  record: RecordType;
  deleteRecord: (record: RecordType) => void;
  openRecord: (record: RecordType) => void;
}

const DatasetActions: React.FC<Props> = ({
  record,
  deleteRecord,
  openRecord
}) => {
  function clickEdit() {
    openRecord(record);
  }

  function clickDelete() {
    deleteRecord(record);
  }

  return (
    <div className="flex">
      <div className="flex-1 px-6 py-4" title="Datensatz editieren">
        <div className="w-full text-center">
          <button
            className="m-4 text-nutrition-darkest bg-yellow-100 px-4 py-2 text-sm font-semibold rounded-lg hover:bg-yellow-200 focus:bg-gray focus:outline-none focus:shadow-outline inline-flex items-center"
            type="button"
            onClick={clickEdit}
          >
            <svg
              className="w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
            <span>Editieren</span>
          </button>
        </div>
      </div>
      <div className="flex-1 px-6 py-4" title="Datensatz löschen">
        <div className="w-full text-center">
          <button
            className="m-4 text-nutrition-darkest bg-nutrition-lightest px-4 py-2 text-sm font-semibold rounded-lg hover:bg-nutrition-light focus:bg-gray focus:outline-none focus:shadow-outline inline-flex items-center"
            type="button"
            onClick={clickDelete}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Löschen</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default DatasetActions;
