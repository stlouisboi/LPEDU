import '../src/index.css';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Toaster } from '../src/components/ui/sonner';

const BASE_URL = process.env.REACT_APP_BACKEND_URL || '';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  // Strip query strings — canonical always points to the clean path
  const canonical = `${BASE_URL}${router.asPath.split('?')[0].split('#')[0]}`;

  return (
    <>
      <Head>
        <link rel="canonical" href={canonical} />
      </Head>
      <Component {...pageProps} />
      <Toaster position="top-right" richColors />
    </>
  );
}
