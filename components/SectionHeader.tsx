import Link from 'next/link';
import React from 'react';
import { useEffect, useState } from 'react';

type SectionHeaderProps = {
  color: string;
  text: string;
  button?: boolean;
  href?: string;
};

const SectionHeader = React.memo<SectionHeaderProps>(
  ({ color, text, button, href }) => {
    const [fromColor, setFromColor] = useState('from-blue-100');
    const [toColor, setToColor] = useState('to-blue-300');
    const [textColor, setTextColor] = useState('text-blue-900');

    useEffect(() => {
      // https://tailwindcss.com/docs/optimizing-for-production#writing-purgeable-html
      switch (color) {
        case 'green':
          setFromColor(`from-green-100`);
          setToColor(`to-green-300`);
          setTextColor(`text-green-900`);
          break;
        case 'blue':
          setFromColor(`from-blue-100`);
          setToColor(`to-blue-300`);
          setTextColor(`text-blue-900`);
          break;
        case 'mobility':
          setFromColor(`from-mobility-light`);
          setToColor(`to-mobility`);
          setTextColor(`text-mobility-darkest`);
          break;
        case 'nutrition':
          setFromColor(`from-nutrition-lightest`);
          setToColor(`to-nutrition-light`);
          setTextColor(`text-nutrition-darkest`);
          break;
      }
    }, [color]);

    if (button) {
      return (
        <Link href={href}>
          <div
            className={`p-10 m-8 md:p-20 w-full rounded-2xl shadow-lg cursor-pointer group bg-gradient-to-br ${fromColor} ${toColor}`}
          >
            <h1
              className={`text-4xl ${textColor} font-semibold transform duration-100 group-hover:translate-x-4`}
            >
              {text}
            </h1>
          </div>
        </Link>
      );
    }

    return (
      <div
        className={`p-10 md:p-20 rounded-2xl shadow-lg bg-gradient-to-br ${fromColor} ${toColor}`}
      >
        <h1 className={`text-4xl ${textColor} font-semibold`}>{text}</h1>
      </div>
    );
  }
);

export default SectionHeader;
