import React from 'react';
import { Modal } from '@webeetle/windy';
import { User, Role } from '@prisma/client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

interface ModalProps {
  opened: boolean;
  user: User;
  closeModal: (...args: any[]) => any;
}

const UserModal: React.FC<ModalProps> = ({ opened, user, closeModal }) => {
  const router = useRouter();

  const { register, handleSubmit } = useForm<User>();

  const onSubmit: SubmitHandler<User> = async data => {
    const merged = { ...user, ...data };
    console.log(merged);
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(merged)
    });

    if (response.ok) {
      toast.success('Datensatz erfolgreich hochgeladen');
      router.replace(router.asPath);
    } else {
      toast.error(`Error: ${response.statusText}`);
    }
  };

  return (
    <Modal isOpen={opened} title="User editieren" onClickIcon={closeModal}>
      <div>
        <form className="p-4 max-w-xl m-auto" onSubmit={handleSubmit(onSubmit)}>
          <label className="text-gray-600 font-medium">Name</label>
          <input
            className="border-solid border-gray-300 border py-2 px-4 mb-4 w-full rounded text-gray-700"
            disabled
            type="text"
            name={'name'}
            autoFocus
            defaultValue={user.name}
            {...register('name')}
          />
          <select
            className="border-solid border-gray-300 border py-2 px-4 w-full rounded text-gray-700"
            name="role"
            defaultValue={user.role}
            {...register('role', {
              required: true
            })}
          >
            <option value={Role.ADMIN}>Admin</option>
            <option value={Role.TEACHER}>Lehrer</option>
            <option value={Role.USER}>User</option>
          </select>
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

export default UserModal;
