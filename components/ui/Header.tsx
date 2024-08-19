'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Button from './Button';
import { RoutePath } from '@/common/constants';
import { usePathname, useRouter } from 'next/navigation';
import { useModal } from '@/hooks/useModal';
import Modal from './Modal';
import Loading from '@/app/loading';

const headerMenu: {
  menuName: string;
  path: (typeof RoutePath)[keyof typeof RoutePath];
}[] = [{ menuName: 'home', path: RoutePath.Home }];

export default function Header() {
  const { data: session, status } = useSession();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const {
    isShowModal: isShowLogoutModal,
    toggleShowModal: toggleShowLogoutModal,
  } = useModal();

  if (status === 'loading') {
    return <Loading height='h-24' />;
  }

  return (
    <header className='fixed z-10 inset-x-0 top-0 flex flex-col justify-between h-24 pt-2 px-8 border-b-2 border-gray_white bg-background'>
      <div className='flex justify-between items-center'>
        <button
          className='px-2.5 py-1.5 rounded bg-primary font_extra_large text-white'
          onClick={() => router.push(RoutePath.Home)}
        >
          {t('app_name')}
        </button>
        {session ? (
          <div className='flex gap-2'>
            <Button
              visual='white_text_secondary'
              onClick={() => toggleShowLogoutModal(true)}
            >
              {t('logout')}
            </Button>
            {pathname === RoutePath.PostArticle ? (
              <>
                <Button visual='white_text_gray'>
                  {t('save_draft_article')}
                </Button>
                <Button>{t('publish_article')}</Button>
              </>
            ) : (
              <Button onClick={() => router.push(RoutePath.PostArticle)}>
                {t('post_article')}
              </Button>
            )}
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
                  ? `border-b-4 border-secondary`
                  : 'text-gray_black'
              }`}
              onClick={() => router.push(`${menu.path}`)}
            >
              {t(`${menu.menuName}`)}
            </button>
          ))}
      </div>
      {/* Modalコンポーネント */}
      <Modal
        isShowModal={isShowLogoutModal}
        title={t('logout')}
        contents={t('logout_contents')}
        handleNegativeButtonClick={() => toggleShowLogoutModal(false)}
        handlePositiveButtonClick={signOut}
      ></Modal>
    </header>
  );
}
