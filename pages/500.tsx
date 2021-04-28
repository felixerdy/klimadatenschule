import React from 'react';
import Image from 'next/image';

const Custom404: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-evenly flex-col-reverse sm:flex-row">
        <Image
          src="/images/undraw_server_down_s4lk.svg"
          alt="Picture of the author"
          width={400}
          height={400}
        ></Image>
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-gray-800 text-8xl font-extrabold">500</h1>
          <h1 className="text-gray-500 text-4xl font-extrabold">
            Internal Server Error
          </h1>
        </div>
      </div>
    </>
  );
};

export default Custom404;
