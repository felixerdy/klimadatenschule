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
      <Head>
        <title>KlimaDatenSchule WebApp</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <ToastContainer position="top-right"></ToastContainer>
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
