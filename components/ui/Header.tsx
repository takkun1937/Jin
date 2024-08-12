'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Button from './Button';
import { RoutePath } from '@/common/constants';
import { usePathname, useRouter } from 'next/navigation';

export default function Header() {
  const { data: session } = useSession();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const headerMenu: {
    menuName: string;
    path: (typeof RoutePath)[keyof typeof RoutePath];
  }[] = [{ menuName: 'home', path: RoutePath.Home }];

  return (
    <header className='flex flex-col justify-between h-[10%] pt-2 px-8 border-b-2 border-gray-300'>
      <div className='flex justify-between items-center'>
        <button
          className='px-2.5 py-1.5 rounded bg-red-400 font-bold text-4xl text-white'
          onClick={() => router.push(RoutePath.Home)}
        >
          {t('app_name')}
        </button>
        {session ? (
          <div>
            <Button visual='white' onClick={() => signOut()} className='mr-2'>
              {t('logout')}
            </Button>
            <Button onClick={() => router.push(RoutePath.PostArticle)}>
              {t('post_article')}
            </Button>
          </div>
        ) : (
          <Button onClick={() => signIn()}>{t('login')}</Button>
        )}
      </div>
      <div>
        {headerMenu.length > 0 &&
          headerMenu.map((menu, index) => (
            <button
              key={index}
              className={`px-3 py-1 font-bold ${
                pathname === menu.path
                  ? `border-b-4 border-red-500`
                  : 'text-gray-500'
              }`}
              onClick={() => router.push(`${menu.path}`)}
            >
              {t(`${menu.menuName}`)}
            </button>
          ))}
      </div>
    </header>
  );
}
