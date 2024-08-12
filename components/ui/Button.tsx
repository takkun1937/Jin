import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  visual?: 'default' | 'white_red' | 'white_black';
}

export default function Button({
  visual = 'default',
  className,
  children,
  ...props
}: ButtonProps) {
  const visualClassNames = {
    default: 'bg-red-500 text-white',
    white_red: 'bg-white text-red-500 border border-red-500',
    white_black: 'bg-white text-black border border-black',
  };

  return (
    <button
      className={`px-4 py-1 rounded font-bold ${visualClassNames[visual]} ${
        className ? className : ''
      }`}
      {...props}
    >
      {children}
    </button>
  );
}
