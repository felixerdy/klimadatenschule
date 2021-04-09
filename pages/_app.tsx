import '@fontsource/poppins/200.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/800.css';

import 'tailwindcss/tailwind.css';

import { useRouter } from 'next/router';
import Transition from '../components/Transition';

import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import React from 'react';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Footer from '../components/Footer';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  return (
    <Provider session={pageProps.session}>
      <Header />
      <Transition location={router.pathname}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <Footer></Footer>
      </Transition>
    </Provider>
  );
};

export default App;
