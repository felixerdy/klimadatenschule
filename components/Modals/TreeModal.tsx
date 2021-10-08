import React from 'react';
import { Modal } from '@webeetle/windy';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { TreeRecord } from '@prisma/client';

interface ModalProps {
  opened: boolean;
  record: TreeRecord;
  closeModal: (...args: any[]) => any;
}

const TreeModal: React.FC<ModalProps> = ({ opened, record, closeModal }) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<TreeRecord>();

  const onSubmit: SubmitHandler<TreeRecord> = async data => {
    const response = await fetch(`/api/tree/${record.id}`, {
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
    <Modal isOpen={opened} title="Baum editieren" onClickIcon={closeModal}>
      <div>
        <form className="p-4 max-w-xl m-auto" onSubmit={handleSubmit(onSubmit)}>
          {record && (
            <>
              <div className="flex flex-col m-auto">
                <label className="text-gray-600">Umfang in m</label>
                <input
                  className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
                  type="number"
                  step="any"
                  name={'circumference'}
                  defaultValue={record.circumference}
                  min={0}
                  {...register('circumference', { min: 0 })}
                />
              </div>
              <div className="flex flex-col m-auto">
                <label className="text-gray-600">Höhe in m</label>
                <input
                  className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
                  type="number"
                  step="any"
                  name={'height'}
                  defaultValue={record.height}
                  min={0}
                  {...register('height', { min: 0 })}
                />
              </div>
            </>
          )}
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

export default TreeModal;
