import React from 'react';
import { useEffect, useState } from 'react';

type SectionHeaderProps = {
  color: string;
  text: string;
};

const SectionHeader = React.memo<SectionHeaderProps>(({ color, text }) => {
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
      case 'red':
        setFromColor(`from-red-100`);
        setToColor(`to-red-300`);
        setTextColor(`text-red-900`);
        break;
    }
  }, [color]);

  return (
    <div
      className={`p-10 md:p-20 rounded-2xl shadow-lg bg-gradient-to-br ${fromColor} ${toColor}`}
    >
      <h1 className={`text-4xl ${textColor} font-semibold`}>{text}</h1>
    </div>
  );
});

export default SectionHeader;
