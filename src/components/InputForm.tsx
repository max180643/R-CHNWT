import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { ShortenLinkState } from '../store/shortenLink';
import { addNotificationItem, notificationItem } from '../utils/notification';
import axios from 'axios';
import LinkIcon from './icons/LinkIcon';

const InputForm = () => {
  const [shortenLinkItems, setShortenLinkItems] =
    useRecoilState(ShortenLinkState);
  const [optionalToggle, setOptionalToggle] = useState(false);
  const [linkURL, setLinkURL] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [fetching, setFetching] = useState(false);

  const resetState = () => {
    setLinkURL('');
    setOptionalToggle(false);
    setCustomAlias('');
  };

  const fetchAPI = async () => {
    await axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/url/create`, {
        fullURL: linkURL,
        customAlias: customAlias,
      })
      .then((res) => {
        const { response } = res.data;
        setShortenLinkItems([
          ...shortenLinkItems,
          {
            id: response?.id,
            shortURL: response?.shortURL,
            fullURL: response?.fullURL,
          },
        ]);
        resetState();
      })
      .catch((err) => {
        const { data } = err.response;
        data?.response
          ? addNotificationItem(notificationItem('Error', data.response))
          : addNotificationItem(notificationItem('Error', err.message));
        resetState();
      });
    setFetching(false);
  };

  const handleClick = async () => {
    if (linkURL === '' && fetching !== true) {
      addNotificationItem(
        notificationItem('Error', 'Please enter URL to create.')
      );
    } else if (linkURL !== '' && fetching !== true) {
      setFetching(true);
      fetchAPI();
    }
  };

  const handleToggle = () => {
    setCustomAlias('');
    if (optionalToggle === false) {
      setOptionalToggle(true);
    } else {
      setOptionalToggle(false);
    }
  };

  return (
    <div className="flex justify-center pt-4">
      <div className="lg:w-8/12 md:w-9/12 w-full">
        <span className="text-secondary text-sm">
          Enter URL to create shorten link.
        </span>
        {/* URL Input */}
        <div className="my-1 flex flex-wrap">
          <div className="flex-1 border rounded text-lg py-1 px-3 focus-within:border-main focus-within:shadow-input hover:border-main ease-linear duration-150">
            <span className="mr-1">
              <LinkIcon className="w-4 inline-block" />
            </span>
            <input
              type="url"
              placeholder="https://www.example.com/"
              className="lg:w-[95%] md:w-[93%] w-[91%] focus:outline-none text-base text-gray-600 placeholder:text-gray-400"
              value={linkURL}
              onChange={(e) => setLinkURL(e.target.value)}
            />
          </div>
          <button
            onClick={async () => await handleClick()}
            className="md:w-auto w-full md:px-10 md:ml-2 md:mt-0 mt-2 bg-main hover:bg-main-hover text-white font-bold py-2 px-6 rounded ease-linear duration-150"
          >
            {fetching ? (
              <svg
                className="w-6 h-6 mx-8 text-main animate-spin fill-white"
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
            ) : (
              'Shorten URL'
            )}
          </button>
        </div>
        {/* Optional Custom Alias */}
        <div>
          <input
            className="h-4 w-4 mt-1 mr-2 rounded-sm align-top focus:outline-none transition duration-200 cursor-pointer float-left"
            type="checkbox"
            checked={optionalToggle}
            onChange={() => {
              handleToggle();
            }}
          />
          <label
            className="inline-block text-sm text-gray-500 cursor-pointer select-none"
            onClick={() => handleToggle()}
          >
            Custom alias (optional)
          </label>
        </div>
        {/* Custom Alias Input */}
        {!!optionalToggle && (
          <div className="flex my-1">
            <span className="flex items-center leading-normal bg-gray-50 text-gray-600 text-sm px-3 whitespace-no-wrap border border-r-0 rounded-l">
              r.chnwt.dev/
            </span>
            <input
              type="text"
              className="flex-1 min-w-0 leading-normal border h-10 px-3 focus:outline-none rounded-r focus-within:border-main focus-within:shadow-input hover:border-main ease-linear duration-150"
              placeholder="custom"
              value={customAlias}
              onChange={(e) => setCustomAlias(e.target.value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InputForm;
