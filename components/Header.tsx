import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import Image from 'next/image';
import { Menu } from '@headlessui/react';
import Dropdown from './Dropdown';

import Logo from '../public/images/KDS-Logo-hoch-neonfarben-rgb.svg';

import { signIn } from 'next-auth/client';

const Header: React.FC = () => {
  const router = useRouter();

  const [bgColor, setBgColor] = useState('bg-kds-light');

  useEffect(() => {
    if (router.pathname.includes('baum')) {
      setBgColor('bg-tree-light');
    } else if (router.pathname.includes('mobilitaet')) {
      setBgColor('bg-mobility-light');
    } else if (router.pathname.includes('papier')) {
      setBgColor('bg-paper');
    } else if (router.pathname.includes('ernaehrung')) {
      setBgColor('bg-nutrition');
    } else {
      setBgColor('bg-kds-light');
    }
  }, [router.pathname]);

  const isActive: (pathname: string) => boolean = pathname =>
    router.pathname === pathname;

  const [session, loading] = useSession();

  const [open, setOpen] = useState(false);

  const NavButton: React.FC<React.HTMLAttributes<HTMLButtonElement>> =
    props => {
      return (
        <button
          className={
            props.className ||
            'px-4 py-2 mt-2 text-sm font-semibold rounded-full md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray focus:outline-none focus:shadow-outline`'
          }
          onClick={props.onClick}
        >
          {props.children}
        </button>
      );
    };

  interface NavButtonLinkProps {
    href: string;
    text: string;
  }
  const NavButtonLink: React.FC<NavButtonLinkProps> = props => {
    return (
      <Link href={props.href}>
        <a
          className={`${
            isActive(props.href) ? 'text-gray-900 bg-gray-200' : ''
          } px-4 py-2 mt-2 ml-4 text-sm font-semibold rounded-full md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray focus:outline-none focus:shadow-outline`}
        >
          {props.text}
        </a>
      </Link>
    );
  };

  const LoginButton: React.FC<NavButtonLinkProps> = props => {
    return (
      <Link href={props.href}>
        <a
          className={`text-indigo-100 bg-indigo-700 px-4 py-2 mt-2 ml-4 text-sm font-semibold rounded-full md:mt-0 md:ml-4 hover:bg-indigo-900 focus:bg-gray focus:outline-none focus:shadow-outline`}
        >
          {props.text}
        </a>
      </Link>
    );
  };

  return (
    <div
      className="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800 relative"
      style={{
        background: `linear-gradient(-90deg, rgba(0,0,255,.03) 1px, transparent 1px),
        linear-gradient(rgba(0,0,255,.03) 1px, transparent 1px),
        linear-gradient(-90deg, rgba(0, 0, 255, .02) 1px, transparent 1px),
        linear-gradient(rgba(0,0,255,.02) 1px, transparent 1px),
        #f2f2f2`,
        backgroundSize: `20px 20px, 20px 20px`
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-transparent to-white opacity-80"></div>
      <div
        x-data="{ open: false }"
        className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
      >
        <div className="p-4 flex flex-row items-center justify-between">
          <Link href={'/'} passHref>
            <div className="w-24 h-full cursor-pointer">
              <Image src={Logo} alt="KDS Logo" layout="responsive" />
            </div>
          </Link>
          <button
            className="bg-kds-green-neon p-2 md:hidden rounded-full focus:outline-none focus:shadow-outline z-10"
            onClick={() => setOpen(!open)}
          >
            <svg fill="currentColor" viewBox="0 0 20 20" className="w-6 h-6">
              {!open && (
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                ></path>
              )}
              {open && (
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              )}
            </svg>
          </button>
        </div>
        <nav
          className={`${
            open ? 'flex' : 'hidden'
          } flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row z-10`}
        >
          <Link href={'/wald-baum'}>
            <a className="bg-tree px-4 py-2 mt-2 ml-4 text-sm font-semibold rounded-full md:mt-0 md:ml-4 hover:bg-green-300 focus:bg-gray focus:outline-none focus:shadow-outline self-center">
              Bäume
            </a>
          </Link>
          <Link href={'/mobilitaet'}>
            <a className="bg-mobility px-4 py-2 mt-2 ml-4 text-sm font-semibold rounded-full md:mt-0 md:ml-4 hover:bg-gray-300 focus:bg-gray focus:outline-none focus:shadow-outline self-center">
              Mobilität
            </a>
          </Link>
          <Link href={'/papier'}>
            <a className="bg-paper px-4 py-2 mt-2 ml-4 text-sm font-semibold rounded-full md:mt-0 md:ml-4 hover:bg-blue-300 focus:bg-gray focus:outline-none focus:shadow-outline self-center">
              Papier
            </a>
          </Link>
          <Link href={'/ernaehrung'}>
            <a className=" bg-nutrition px-4 py-2 mt-2 ml-4 text-sm font-semibold rounded-full md:mt-0 md:ml-4 hover:bg-nutrition focus:bg-gray focus:outline-none focus:shadow-outline self-center">
              Ernährung
            </a>
          </Link>
          <Link href={'/dataset'}>
            <a className="bg-kds-green-neon px-4 py-2 mt-2 ml-4 text-sm font-semibold rounded-full md:mt-0 md:ml-4 hover:bg-gray-300 focus:bg-gray focus:outline-none focus:shadow-outline self-center">
              Datensätze
            </a>
          </Link>
          {/* <NavButtonLink href="/dataset" text="Datensätze" /> */}
          {/* <NavButtonLink href="/tools" text="Werkzeuge" /> */}
          {session ? (
            <div className="relative inline-block text-left z-10">
              <Dropdown></Dropdown>
            </div>
          ) : (
            // <Link href={'/api/auth/signin'}>
            <button
              onClick={() => signIn('fusionauth')}
              className="bg-kds-green-neon px-4 py-2 mt-2 ml-4 text-sm font-semibold rounded-full md:mt-0 md:ml-4 hover:bg-gray-300 focus:bg-gray focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
            // </Link>
            // <LoginButton href="/api/auth/signin" text="Login" />
          )}
        </nav>
      </div>
      <div className="relative h-24 w-full">
        <div
          className="bg-kds-green-header py-12 w-full absolute top-0"
          style={{
            clipPath:
              'polygon(100% 100%, 100% 44%, 66% 51%, 37% 8%, 0 51%, 0 100%)'
          }}
        ></div>
        <div
          className="bg-kds-green-neon py-12 w-full absolute top-0"
          style={{
            clipPath:
              'polygon(100% 100%, 100% 31%, 66% 64%, 36% 53%, 0 35%, 0 100%)'
          }}
        ></div>
        <div
          className={`${bgColor} py-12 w-full absolute top-0`}
          style={{
            clipPath: 'polygon(100% 72%, 100% 100%, 0 100%, 20% 75%, 67% 87%)'
          }}
        ></div>
      </div>
    </div>
  );
};

export default Header;
