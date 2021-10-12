import { signIn, useSession } from 'next-auth/client';
import React from 'react';

type Props = {
  children: JSX.Element[];
};

const LoginCheck: React.FC<Props> = ({ children }) => {
  const [session, loading] = useSession();

  if (!session) {
    return (
      <div className="w-full flex justify-center items-center bg-white rounded p-4 mt-8">
        <p>Bitte logge dich ein, um Daten speichern zu können.</p>
        <button
          onClick={() => signIn('fusionauth')}
          type="button"
          className="bg-kds-green-neon px-4 py-2 mt-2 ml-4 text-sm font-semibold rounded-full md:mt-0 md:ml-4 hover:bg-gray-300 focus:bg-gray focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </div>
    );
  }

  return <>{children}</>;
};

export default LoginCheck;
