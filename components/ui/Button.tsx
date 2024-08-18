import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  visual?: 'secondary' | 'white_text_secondary' | 'white_text_gray';
}

export default function Button({
  visual = 'secondary',
  className,
  children,
  ...props
}: ButtonProps) {
  const visualClassNames = {
    secondary: 'bg-secondary text-white',
    white_text_secondary: 'bg-white text-secondary border border-secondary',
    white_text_gray: 'bg-white text-gray_black border border-gray_black',
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
