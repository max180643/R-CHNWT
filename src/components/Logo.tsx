import Link from 'next/link';
import Image from 'next/image';

const LOGO_SIZE = 40;

const Logo = () => {
  return (
    <Link href="/">
      <div className="hover:cursor-pointer">
        <h1 className="text-3xl font-medium">
          <span className="text-main">R</span>
          <span className="text-secondary"> - </span>
          <span className="text-main">CHNWT </span>
          <div className="inline-block align-middle">
            <Image
              src="/img/logo128.png"
              alt="Logo"
              width={LOGO_SIZE}
              height={LOGO_SIZE}
            />
          </div>
        </h1>
      </div>
    </Link>
  );
};

export default Logo;
