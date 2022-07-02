import { useState } from 'react';
import ErrorIcon from './icons/ErrorIcon';
import CheckIcon from './icons/CheckIcon';
import XIcon from './icons/XIcon';
import CopyIcon from './icons/CopyIcon';

interface propsType {
  type: string;
  msg: string;
}

const Notification = (props: propsType) => {
  const [toggle, setToggle] = useState(true);
  const [show, setShow] = useState(true);

  const closeTimeout = setTimeout(() => closeToggle(), 3000);

  const closeToggle = () => {
    clearTimeout(closeTimeout);
    setToggle(false);
    setTimeout(() => setShow(false), 300);
  };

  return (
    <div
      className={`relative rounded shadow py-4 px-6 mr-8 mb-10 bg-white w-64 ${
        toggle ? 'animate-toggleIn' : 'animate-toggleOut'
      } ${show ? 'block' : 'hidden'}`}
    >
      <div className="flex">
        <div>
          {props.type === 'Error' && <ErrorIcon className="w-6" />}
          {props.type === 'Success' && <CheckIcon className="w-6" />}
          {props.type === 'Copied' && <CopyIcon className="w-6 text-main" />}
        </div>
        <div className="w-full mx-3">
          <h1 className="font-bold">{props.type}</h1>
          <span className="text-sm">{props.msg}</span>
        </div>
        <div>
          <XIcon
            className="w-3 cursor-pointer hover:text-gray-500"
            onClick={() => closeToggle()}
          />
        </div>
      </div>
    </div>
  );
};

export default Notification;
