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
    setFromColor(`from-${color}-100`);
    setToColor(`to-${color}-300`);
    setTextColor(`text-${color}-900`);
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
