import React from 'react';
import { Modal } from '@webeetle/windy';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { IMobilityForm, MobilityDescription } from '../../types/mobility';

interface ModalProps {
  opened: boolean;
  closeModal: (...args: any[]) => any;
}

export const Mobilities: MobilityDescription[] = [
  {
    type: 'pkw',
    title: '🚙 PKW',
    thgpkm: 154
  },
  {
    type: 'bahn',
    title: '🚂 Eisenbahn',
    thgpkm: 54
  },
  {
    type: 'bus',
    title: '🚌 Bus',
    thgpkm: 83
  },
  {
    type: 'ubahn',
    title: '🚋 S-Bahn / U-Bahn',
    thgpkm: 54
  },
  {
    type: 'fahrrad',
    title: '🚴 Fahrrad',
    thgpkm: 0
  },
  {
    type: 'fuss',
    title: '🚶 zu Fuß',
    thgpkm: 0
  }
];

const MobilityModal: React.FC<ModalProps> = ({ opened, closeModal }) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<IMobilityForm>();

  const onSubmit: SubmitHandler<IMobilityForm> = async data => {
    const response = await fetch('/api/organisation', {
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
      title="Schule / Organisation hinzufügen"
      onClickIcon={closeModal}
    >
      <div>
        <form className="p-4 max-w-xl m-auto" onSubmit={handleSubmit(onSubmit)}>
          <label className="text-gray-600 font-medium">Tag</label>
          <input
            className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
            type="date"
            name={'timestamp'}
            defaultValue={new Date().toJSON().slice(0, 10)}
            autoFocus
            {...register('timestamp')}
          />

          {Mobilities.map(m => (
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

export default MobilityModal;
