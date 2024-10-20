import React, { Suspense } from 'react';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import Main from '../ui/Main';
import Loading from '@/app/loading';

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex flex-col h-full'>
      <Header />
      <Suspense fallback={<Loading />}>
        <Main>{children}</Main>
      </Suspense>
      <Footer />
    </div>
  );
}
