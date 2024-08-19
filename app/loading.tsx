import { HTMLAttributes } from 'react';

interface LoadingProps extends HTMLAttributes<HTMLDivElement> {
  height?: string;
}

export default function Loading({
  height = 'h-full',
  className = '',
  ...props
}: LoadingProps) {
  return (
    <div
      className={`flex justify-center items-center bg-gray_black bg-opacity-50 ${height} ${className}`}
      {...props}
    >
      <div className='animate-spin h-10 w-10 border-4 border-primary rounded-full border-t-transparent'></div>
    </div>
  );
}
