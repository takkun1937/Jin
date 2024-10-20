import React from 'react';

export default function Main({ children }: { children: React.ReactNode }) {
  return <main className='flex-1 pt-24 bg-background'>{children}</main>;
}
