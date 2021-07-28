import React from 'react';
import { Modal } from '@webeetle/windy';
import { PaperRecord } from '@prisma/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { IPaperForm, PaperDescription } from '../../types/paper';

interface ModalProps {
  opened: boolean;
  record: PaperRecord;
  closeModal: (...args: any[]) => any;
}

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

const PaperModal: React.FC<ModalProps> = ({ opened, record, closeModal }) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<IPaperForm>();

  const onSubmit: SubmitHandler<IPaperForm> = async data => {
    const response = await fetch(`/api/paper/${record.id}`, {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (response.ok) {
      toast.success('Datensatz erfolgreich hochgeladen');
      router.replace(router.asPath);
    } else {
      toast.error(`Error: ${response.statusText}`);
    }
  };

  return (
    <Modal
      isOpen={opened}
      title="Papierprodukte editieren"
      onClickIcon={closeModal}
    >
      <div>
        <form className="p-4 max-w-xl m-auto" onSubmit={handleSubmit(onSubmit)}>
          {record &&
            PaperProducts.map(m => (
              <React.Fragment key={m.title}>
                <label className="text-gray-600 font-medium">{m.title}</label>
                <input
                  className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
                  type="number"
                  name={m.title}
                  defaultValue={record[m.type]}
                  min={0}
                  max={1000}
                  {...register(m.type, { min: 0, max: 50 })}
                />
              </React.Fragment>
            ))}

          <button
            type="submit"
            className="text-green-800 bg-green-200 px-4 py-2 mt-2  text-sm font-semibold rounded-lg hover:bg-green-100 focus:bg-blue focus:outline-none focus:shadow-outline"
          >
            Speichern
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default PaperModal;
