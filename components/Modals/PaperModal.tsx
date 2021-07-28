import React from 'react';
import { Modal } from '@webeetle/windy';
import { OrganisationType } from '@prisma/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

interface ModalProps {
  opened: boolean;
  closeModal: (...args: any[]) => any;
}

interface ISchoolForm {
  type: OrganisationType;
  name: String;
}

const PaperModal: React.FC<ModalProps> = ({ opened, closeModal }) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<ISchoolForm>();

  const onSubmit: SubmitHandler<ISchoolForm> = async data => {
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
          <label className="text-gray-600 font-medium">
            Schule oder Organisation
          </label>

          <select
            className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
            name="organisation"
            {...register('type', {
              required: true
            })}
          >
            <option value={OrganisationType.SCHOOL}>Schule</option>
            <option value={OrganisationType.ORGANISATION}>Organisation</option>
          </select>
          <label className="text-gray-600 font-medium">Name</label>
          <input
            className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
            type="type"
            name={'name'}
            autoFocus
            {...register('name')}
          />
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
