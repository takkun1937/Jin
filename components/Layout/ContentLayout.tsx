import React from 'react';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import Main from '../ui/Main';

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col h-full'>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}
