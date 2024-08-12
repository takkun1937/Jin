import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/ui/Header';
import Main from '@/components/ui/Main';
import Footer from '@/components/ui/Footer';
import ContentLayout from '@/components/Layout/ContentLayout';
import NextAuthProvider from '@/providers/NextAuth';
import { getLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Jin',
  description: 'Jin Frontend Specialist',
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
            <ContentLayout>
              <Header />
              <Main>{children}</Main>
              <Footer />
            </ContentLayout>
          </NextAuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
