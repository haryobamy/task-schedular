import { ButtonHTMLAttributes } from 'react';

export function Button({ ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={` w-full bg-green-400 hover:bg-green-500 cursor-pointer text-white p-4 text-base rounded-xl ${props.className}`}
    >
      {props.children}
    </button>
  );
}
