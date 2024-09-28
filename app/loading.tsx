import { HTMLAttributes } from 'react';

type LoadingProps = HTMLAttributes<HTMLDivElement>;

export default function Loading({ className, ...props }: LoadingProps) {
  return (
    <div
      className={`flex justify-center items-center bg-gray_black bg-opacity-50 ${className}`}
      {...props}
    >
      <div className='animate-spin h-10 w-10 border-4 border-primary rounded-full border-t-transparent'></div>
    </div>
  );
}
