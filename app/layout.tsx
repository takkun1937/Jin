import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ContentLayout from '@/components/Layout/ContentLayout';
import NextAuthProvider from '@/providers/NextAuth';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { TrpcProvider } from '@/providers/trpc';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jin',
  description: 'Jin Frontend Specialist',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jin.com',
    siteName: 'Jin',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <NextAuthProvider>
            <TrpcProvider>
              <ContentLayout>{children}</ContentLayout>
            </TrpcProvider>
          </NextAuthProvider>
        </NextIntlClientProvider>
        <div id='modal_root'></div>
      </body>
    </html>
  );
}
