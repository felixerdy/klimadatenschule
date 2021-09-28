import '@fontsource/nunito/200.css';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/600.css';
import '@fontsource/nunito/800.css';

import 'tailwindcss/tailwind.css';

import Router, { useRouter } from 'next/router';
import Transition from '../components/Transition';

import { Provider } from 'next-auth/client';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import Header from '../components/Header';
import Layout from '../components/Layout';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { WindyProvider } from '@webeetle/windy';

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <Provider session={pageProps.session}>
      <WindyProvider>
        <Head>
          <title>KlimaDatenSchule WebApp</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link rel="shortcut icon" sizes="16x16" href="/favicon_16.ico" />
          <link rel="shortcut icon" sizes="32x32" href="/favicon_32.ico" />
          <link rel="shortcut icon" sizes="96x96" href="/favicon_96.ico" />
        </Head>
        <Header />
        <ToastContainer position="top-right"></ToastContainer>
        <Transition location={router.pathname}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Footer></Footer>
        </Transition>
      </WindyProvider>
    </Provider>
  );
};

export default App;
