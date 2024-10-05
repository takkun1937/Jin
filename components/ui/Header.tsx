'use client';

import { signIn, useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import Button from './Button';
import { RoutePath } from '@/common/constants';
import { usePathname, useRouter } from 'next/navigation';
import Loading from '@/app/loading';
import Image from 'next/image';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useContentCreate } from '@/features/contents/create/hooks/useContentCreate';
import ModalWrapper from '../modal/ModalWrapper';
import { useContentUpdate } from '@/features/contents/update/hooks/useContentUpdate';

const headerMenu: {
  menuName: string;
  path: (typeof RoutePath)[keyof typeof RoutePath];
}[] = [{ menuName: 'home', path: RoutePath.Home }];

export default function Header() {
  const { data: session, status } = useSession();
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const { showLogoutConfirmModal } = useAuth();
  const { handleDraftContentSaveConfirm, handleContentPostConfirm } =
    useContentCreate();
  const { handleDraftContentUpdateConfirm, handleContentUpdateConfirm } =
    useContentUpdate();

  if (status === 'loading') {
    return <Loading className='h-24' />;
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
              onClick={showLogoutConfirmModal}
            >
              {t('button.logout')}
            </Button>
            {pathname === RoutePath.MyContentPost ? (
              <>
                <Button
                  visual='white_text_gray'
                  onClick={handleDraftContentSaveConfirm}
                >
                  {t('button.save_draft_content')}
                </Button>
                <Button onClick={handleContentPostConfirm}>
                  {t('button.post_content')}
                </Button>
              </>
            ) : pathname.includes(RoutePath.MyContentEdit) ? (
              <>
                <Button
                  visual='white_text_gray'
                  onClick={handleDraftContentUpdateConfirm}
                >
                  {t('button.update_draft_content')}
                </Button>
                <Button onClick={handleContentUpdateConfirm}>
                  {t('button.update')}
                </Button>
              </>
            ) : (
              <Button onClick={() => router.push(RoutePath.MyContentPost)}>
                {t('button.create_content')}
              </Button>
            )}
            <button onClick={() => router.push(RoutePath.MyContentList)}>
              <Image
                src={session.user.image ?? ''}
                alt='user icon'
                width={32}
                height={32}
                className='rounded-full'
              />
            </button>
          </div>
        ) : (
          <Button onClick={() => signIn()}>{t('button.login')}</Button>
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
              {t(`button.${menu.menuName}`)}
            </button>
          ))}
      </div>
      <ModalWrapper />
    </header>
  );
}
