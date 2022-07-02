import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getCache, setCache } from '../utils/cache';
import axios from 'axios';
import Head from 'next/head';

const Redirect = () => {
  const [notFound, setNotFound] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const keyID = String(id);

  useEffect(() => {
    const fetchAPI = async () => {
      const cache = getCache(keyID);
      if (!cache) {
        // no-cache
        await axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}/url/${id}`)
          .then((res) => {
            const { response } = res.data;
            const url = response?.fullURL;
            setCache(keyID, url, 1800);
            window.location.replace(url);
          })
          .catch((err) => {
            const { data } = err.response;
            console.error(data);
            setNotFound(true);
          });
      } else {
        // cache
        window.location.replace(cache);
      }
    };

    if (!notFound && id) fetchAPI();
  }, [id]);

  return (
    <>
      <Head>
        <title>
          {notFound ? `Not Found | R-CHNWT` : `Redirecting... | R-CHNWT`}
        </title>
        <meta name="theme-color" content="#ff571c" />
        <link rel="icon" href="/img/logo128.png" />
      </Head>
      <main className="container mx-auto p-7 h-screen">
        <div className="flex flex-col h-full justify-center items-center">
          {notFound ? (
            // notFound
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-8 h-8 fill-main"
            >
              <path d="M506.3 417l-213.3-364c-16.33-28-57.54-28-73.98 0l-213.2 364C-10.59 444.9 9.849 480 42.74 480h426.6C502.1 480 522.6 445 506.3 417zM232 168c0-13.25 10.75-24 24-24S280 154.8 280 168v128c0 13.25-10.75 24-23.1 24S232 309.3 232 296V168zM256 416c-17.36 0-31.44-14.08-31.44-31.44c0-17.36 14.07-31.44 31.44-31.44s31.44 14.08 31.44 31.44C287.4 401.9 273.4 416 256 416z" />
            </svg>
          ) : (
            // spinner
            <svg
              className="w-8 h-8 text-gray-200 animate-spin fill-main"
              viewBox="0 0 100 101"
              fill="none"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          )}
          {/* Text */}
          <span className="text-center text-secondary my-3">
            {notFound ? 'Oops! Nothing was found' : 'Redirecting, please wait…'}
          </span>
        </div>
      </main>
    </>
  );
};

export default Redirect;
