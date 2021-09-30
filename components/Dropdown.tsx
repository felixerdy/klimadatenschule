import { Menu, Transition } from '@headlessui/react';
import prisma from './../lib/prisma';
import { GetServerSideProps } from 'next';
import { useSession, signOut, getSession } from 'next-auth/client';
import Link from 'next/link';
import React from 'react';

const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
const getInitials = function getInitials(name) {
  let initials = [...name.matchAll(rgx)] || [];
  return (
    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
  ).toUpperCase();
};

const Dropdown: React.FC = () => {
  const [session, loading] = useSession();

  return (
    <Menu>
      {({ open }) => (
        <>
          <span className="rounded-md shadow-sm">
            <Menu.Button className="h-9 w-9 bg-purple-400 flex text-sm rounded-full ml-8 focus:outline-none">
              <span className="w-full h-full flex items-center justify-center text-white text-sm font-semibold">
                {getInitials(session.user.name)}
              </span>
            </Menu.Button>
          </span>

          <Transition
            show={open}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
            >
              <div className="px-4 py-3">
                <p className="text-sm font-bold leading-5">Hallo</p>
                <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                  {session.user.name}
                </p>
              </div>

              {/* <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/dataset/my">
                      <a
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                      >
                        Meine Datensätze
                      </a>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link href="/dataset/create">
                      <a
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                      >
                        Datensatz erstellen
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              </div> */}

              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                    >
                      <Link href="/auth/complete-signup">
                        Profil bearbeiten
                      </Link>
                    </a>
                  )}
                </Menu.Item>
                {/* @ts-ignore */}
                {session.user.role !== 'USER' && (
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        className={`${
                          active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                        } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                      >
                        <Link href="/schaltzentrale">Schaltzentrale</Link>
                      </a>
                    )}
                  </Menu.Item>
                )}
                <Menu.Item>
                  {({ active }) => (
                    <a
                      onClick={() => signOut()}
                      className={`${
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                      } flex justify-between w-full px-4 py-2 text-sm leading-5 text-left`}
                    >
                      Logout
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
export default Dropdown;
