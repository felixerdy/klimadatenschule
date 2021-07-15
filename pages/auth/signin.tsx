import { getProviders, signIn } from 'next-auth/client';
import { Provider } from 'next-auth/providers';
import React from 'react';
import Layout from '../../components/Layout';

type Props = {
  providers: Provider[];
};

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: { providers }
  };
}

const SignIn: React.FC<Props> = ({ providers }) => {
  return (
    <Layout>
      <div className="page text-center">
        <h1 className="text-3xl mt-20">Registrierung & Login</h1>
        <main className="mt-20">
          <>
            {Object.values(providers).map((provider: Provider) => (
              <div key={provider.name}>
                {provider.id === 'fusionauth' && (
                  <>
                    <button
                      className="bg-transparent border border-solid border-black hover:bg-black hover:text-white active:bg-black font-semibold px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-2 ease-linear transition-all duration-150"
                      onClick={() => signIn(provider.id)}
                    >
                      Login mit E-Mail & Passwort
                    </button>
                    {/* <p className="mt-2 mb-4">
                      <b>ODER</b>
                    </p> */}
                  </>
                )}
                {/* {provider.id !== 'fusionauth' && (
                  <button
                    className="bg-transparent border border-solid border-black hover:bg-black hover:text-white active:bg-black font-semibold px-6 py-3 rounded outline-none focus:outline-none mr-1 mb-2 ease-linear transition-all duration-150"
                    onClick={() => signIn(provider.id)}
                  >
                    Login mit {provider.name}
                  </button>
                )} */}
              </div>
            ))}
          </>
        </main>
      </div>
    </Layout>
  );
};

export default SignIn;
