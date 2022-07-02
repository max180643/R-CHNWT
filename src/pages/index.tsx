import type { NextPage } from 'next';
import Head from 'next/head';
import Logo from '../components/Logo';
import InputForm from '../components/InputForm';
import ShortenLink from '../components/ShortenLink';
import NotificationList from '../components/NotificationList';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | R-CHNWT</title>
        <meta name="theme-color" content="#ff571c" />
        <link rel="icon" href="/img/logo128.png" />
        {/* Search Engine */}
        <meta
          name="description"
          content="R - CHNWT is a URL shortener for transform a long link"
        />
        <meta
          name="image"
          content="https://r.chnwt.dev/img/logo512_white.png"
        />
        {/* Schema.org for Google */}
        <meta itemProp="name" content="Home | R-CHNWT" />
        <meta
          itemProp="description"
          content="R - CHNWT is a URL shortener for transform a long link"
        />
        <meta
          itemProp="image"
          content="https://r.chnwt.dev/img/logo512_white.png"
        />
        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Home | R-CHNWT" />
        <meta
          name="twitter:description"
          content="R - CHNWT is a URL shortener for transform a long link"
        />
        <meta
          name="twitter:image:src"
          content="https://r.chnwt.dev/img/logo512_white.png"
        />
        {/* Open Graph general (Facebook, Pinterest & Google+) */}
        <meta name="og:title" content="Home | R-CHNWT" />
        <meta
          name="og:description"
          content="R - CHNWT is a URL shortener for transform a long link"
        />
        <meta
          name="og:image"
          content="https://r.chnwt.dev/img/logo512_white.png"
        />
        <meta name="og:url" content="https://r.chnwt.dev/" />
        <meta name="og:site_name" content="R - CHNWT" />
        <meta name="og:type" content="website" />
        {/* Apple icon */}
        <link
          rel="apple-touch-icon"
          href="https://r.chnwt.dev/img/logo192_white.png"
        />
      </Head>
      <main className="container mx-auto p-7">
        <Logo />
        <InputForm />
        <ShortenLink />
        <NotificationList />
      </main>
    </>
  );
};

export default Home;
