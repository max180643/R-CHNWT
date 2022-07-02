import { FC } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import CopyIcon from './icons/CopyIcon';
import { addNotificationItem, notificationItem } from '../utils/notification';
import { ShortenLinkItem } from '../store/shortenLink';

interface ShortenLinkItemProps {
  item: ShortenLinkItem;
}

const ShortenLinkItem: FC<ShortenLinkItemProps> = (props) => {
  const { item } = props;

  return (
    <div className="my-3">
      <div className="border rounded-t py-4 px-4">
        <div className="flex">
          <div className="flex-1 truncate">
            <span className="text-2xl text-main">
              {item.shortURL.includes('https://')
                ? item.shortURL.replace('https://', '').replace(/\/$/, '')
                : item.shortURL.replace('http://', '').replace(/\/$/, '')}
            </span>
          </div>
          <CopyToClipboard
            text={item.shortURL}
            onCopy={() => addNotificationItem(notificationItem('Copied'))}
          >
            <div className="flex items-center cursor-pointer select-none group">
              <span className="text-blue-500 group-hover:text-blue-400 mx-1">
                Copy
              </span>
              <CopyIcon className="inline-block w-4 text-blue-500 group-hover:text-blue-400" />
            </div>
          </CopyToClipboard>
        </div>
      </div>
      <div className="border border-t-0 rounded-b py-3 px-4">
        <span className="text-sm text-secondary">
          Full URL:{' '}
          <a
            href={item.fullURL}
            target="_blank"
            className="text-blue-500 hover:text-blue-400"
          >
            {item.fullURL.includes('https://')
              ? item.fullURL.replace('https://', '').replace(/\/$/, '')
              : item.fullURL.replace('http://', '').replace(/\/$/, '')}
          </a>
        </span>
      </div>
    </div>
  );
};

export default ShortenLinkItem;
