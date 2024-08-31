import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export default function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={`px-3 py-1 rounded border border-gray_white bg-white font-lg focus:outline-none ${className}`}
      {...props}
    />
  );
}
