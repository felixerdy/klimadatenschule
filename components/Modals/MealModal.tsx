import React from 'react';
import { Modal } from '@webeetle/windy';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { IMealForm, MealRecord } from '../../types/meal';

interface ModalProps {
  opened: boolean;
  record: MealRecord;
  closeModal: (...args: any[]) => any;
}

const MealModal: React.FC<ModalProps> = ({ opened, record, closeModal }) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<IMealForm>();

  const onSubmit: SubmitHandler<IMealForm> = async data => {
    const response = await fetch(`/api/meal/${record.id}`, {
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
    <Modal isOpen={opened} title="Gericht editieren" onClickIcon={closeModal}>
      <div>
        <form className="p-4 max-w-xl m-auto" onSubmit={handleSubmit(onSubmit)}>
          {record && (
            <>
              <div className="flex flex-col">
                <label className="text-gray-600 font-bold">Name</label>
                <input
                  className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
                  type="text"
                  name={'name'}
                  defaultValue={record.name}
                  {...register('name', { required: true })}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-bold">CO₂ in kg</label>
                <input
                  className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
                  type="number"
                  step="any"
                  name={'co2'}
                  defaultValue={record.co2}
                  min={0}
                  {...register('co2', { min: 0 })}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 font-bold">
                  Anzahl der Gerichte
                </label>
                <input
                  className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
                  type="number"
                  step="any"
                  name={'count'}
                  defaultValue={record.count}
                  min={1}
                  {...register('count', { min: 1 })}
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

export default MealModal;
