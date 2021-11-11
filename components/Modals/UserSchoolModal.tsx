import React, { useState } from 'react';
import { Modal, Table } from '@webeetle/windy';
import { Organisation, OrganisationType } from '@prisma/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import axios from 'axios';
import { signOut } from 'next-auth/client';

interface ModalProps {
  opened: boolean;
  organisations?: Organisation[];
  closeModal: (...args: any[]) => any;
}

interface ISchoolForm {
  type: OrganisationType;
  name: String;
}

const UserSchoolModal: React.FC<ModalProps> = ({
  opened,
  organisations,
  closeModal
}) => {
  const [filter, setFilter] = useState('');

  const submit = async (organisation: Organisation | null) => {
    const request = await axios.post('/api/user', {
      organisation: organisation?.id ?? 'null'
    });

    if (request.status === 201) {
      toast.success('Schule erfolgreich gespeichert');
      closeModal();
    }
  };

  return (
    <Modal
      isOpen={opened}
      title="Schule auswählen"
      onClickIcon={closeModal}
      size="lg"
    >
      <div className="p-2">
        <label className="font-semibold">Suche</label>
        <input
          className="border-solid border-gray-300 border py-2 px-4 w-full rounded "
          type="text"
          onChange={e => setFilter(e.target.value)}
        />
        <ul className="mt-4">
          <li
            className="hover:bg-gray-200 rounded py-4 px-2 my-1 cursor-pointer"
            key={null}
            onClick={() => submit(null)}
          >
            Keine Schule
          </li>
          <hr className="h-1" />
          {organisations
            .filter(o => o.name.toLowerCase().includes(filter.toLowerCase()))
            .map(o => (
              <li
                className="hover:bg-gray-200 rounded py-4 px-2 my-1 cursor-pointer"
                key={o.id}
                onClick={() => submit(o)}
              >
                {o.name}
              </li>
            ))}
        </ul>
      </div>
    </Modal>
  );
};

export default UserSchoolModal;
