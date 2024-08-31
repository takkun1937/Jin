'use client';

import { signIn, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Button from './Button';
import { ModalType, RoutePath } from '@/common/constants';
import { usePathname, useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import { useAtomValue, useSetAtom } from 'jotai';
import { mdValueAtom, modalAtom } from '@/atoms';
import { validateMdValue } from '@/common/utils';
import ModalWrapper from '../modal/ModalWrapper';

const headerMenu: {
  menuName: string;
  path: (typeof RoutePath)[keyof typeof RoutePath];
}[] = [{ menuName: 'home', path: RoutePath.Home }];

export default function Header() {
  const { data: session, status } = useSession();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const mdValueAtomValue = useAtomValue(mdValueAtom);
  const setModalAtom = useSetAtom(modalAtom);

  // 記事投稿ボタンクリック時の処理
  const handlePostContentButtonClick = () => {
    if (validateMdValue(mdValueAtomValue)) {
      setModalAtom(ModalType.PostContent);
    } else {
      setModalAtom(ModalType.ValidateMdValueError);
    }
  };

  if (status === 'loading') {
    return <Loading height='h-24' />;
  }

  return (
    <header className='fixed z-10 inset-x-0 top-0 flex flex-col justify-between h-24 pt-2 px-8 border-b-2 border-gray_white bg-background'>
      <div className='flex justify-between items-center'>
        <button
          className='px-2.5 py-1.5 rounded bg-primary font-xl text-white'
          onClick={() => router.push(RoutePath.Home)}
        >
          {t('app_name')}
        </button>
        {session ? (
          <div className='flex gap-2'>
            <Button
              visual='white_text_secondary'
              onClick={() => {
                setModalAtom(ModalType.Logout);
              }}
            >
              {t('logout')}
            </Button>
            {pathname === RoutePath.PostContent ? (
              <>
                <Button visual='white_text_gray'>
                  {t('save_draft_content')}
                </Button>
                <Button onClick={handlePostContentButtonClick}>
                  {t('publish_content')}
                </Button>
              </>
            ) : (
              <Button onClick={() => router.push(RoutePath.PostContent)}>
                {t('post_content')}
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
      {/* モーダル表示領域 */}
      <ModalWrapper />
    </header>
  );
}
