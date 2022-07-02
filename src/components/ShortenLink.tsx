import { useRecoilState } from 'recoil';
import { ShortenLinkState } from '../store/shortenLink';
import ShortenLinkItem from './ShortenLinkItem';

const ShortenLink = () => {
  const [shortenLinkItems, setShortenLinkItems] =
    useRecoilState(ShortenLinkState);

  if (!shortenLinkItems.length) return <></>;

  return (
    <div className="flex justify-center pt-3">
      <div className="lg:w-8/12 md:w-9/12 w-full">
        <span className="text-secondary text-sm">Your shortened URL</span>
        <div>
          {shortenLinkItems.map((item) => {
            return <ShortenLinkItem key={item.id} item={item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default ShortenLink;
