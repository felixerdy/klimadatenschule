import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactChild;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-kds-green-neon rounded-full p-3 m-4 text-sm font-semibold hover:bg-nutrition-light focus:bg-gray focus:outline-none focus:shadow-outline"
    >
      {children}
    </button>
  );
};

export default Button;
