import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/client';
import Image from 'next/image';
import { Menu } from '@headlessui/react';
import Dropdown from './Dropdown';

const Header: React.FC = () => {
  const router = useRouter();

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
            'px-4 py-2 mt-2 text-sm font-semibold rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray focus:outline-none focus:shadow-outline`'
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
          } px-4 py-2 mt-2 ml-4 text-sm font-semibold rounded-lg md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray focus:outline-none focus:shadow-outline`}
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
          className={`text-indigo-100 bg-indigo-700 px-4 py-2 mt-2 ml-4 text-sm font-semibold rounded-lg md:mt-0 md:ml-4 hover:bg-indigo-900 focus:bg-gray focus:outline-none focus:shadow-outline`}
        >
          {props.text}
        </a>
      </Link>
    );
  };

  return (
    <div className="w-full text-gray-700 bg-white dark-mode:text-gray-200 dark-mode:bg-gray-800">
      <div
        x-data="{ open: false }"
        className="flex flex-col max-w-screen-xl px-4 mx-auto md:items-center md:justify-between md:flex-row md:px-6 lg:px-8"
      >
        <div className="p-4 flex flex-row items-center justify-between">
          <Link href={'/'}>
            <a
              href="/"
              className="text-lg font-semibold tracking-widest text-gray-900 uppercase rounded-lg dark-mode:text-white focus:outline-none focus:shadow-outline"
            >
              Klima Daten Schule
            </a>
          </Link>
          <button
            className="md:hidden rounded-lg focus:outline-none focus:shadow-outline"
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
          } flex-col flex-grow pb-4 md:pb-0 md:flex md:justify-end md:flex-row`}
        >
          <Link href={'/wald-baum'}>
            <a className="text-green-900 bg-green-200 px-4 py-2 mt-2 ml-4 text-sm font-semibold rounded-lg md:mt-0 md:ml-4 hover:bg-green-300 focus:bg-gray focus:outline-none focus:shadow-outline">
              Wald & Bäume
            </a>
          </Link>
          <Link href={'/ernaehrung'}>
            <a className="text-red-900 bg-red-200 px-4 py-2 mt-2 ml-4 text-sm font-semibold rounded-lg md:mt-0 md:ml-4 hover:bg-red-300 focus:bg-gray focus:outline-none focus:shadow-outline">
              Ernährung
            </a>
          </Link>
          <Link href={'/papier'}>
            <a className="text-blue-900 bg-blue-200 px-4 py-2 mt-2 ml-4 text-sm font-semibold rounded-lg md:mt-0 md:ml-4 hover:bg-blue-300 focus:bg-gray focus:outline-none focus:shadow-outline">
              Papier
            </a>
          </Link>
          <Link href={'/mobilitaet'}>
            <a className="text-mobility-darkest bg-mobility-light px-4 py-2 mt-2 ml-4 text-sm font-semibold rounded-lg md:mt-0 md:ml-4 hover:bg-gray-300 focus:bg-gray focus:outline-none focus:shadow-outline">
              Mobilität
            </a>
          </Link>
          <NavButtonLink href="/dataset" text="Datensätze" />
          <NavButtonLink href="/tools" text="Werkzeuge" />
          {session ? (
            <div className="relative inline-block text-left z-10">
              <Dropdown></Dropdown>
            </div>
          ) : (
            <LoginButton href="/api/auth/signin" text="Login" />
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;
