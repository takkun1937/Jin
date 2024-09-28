import { modalAtom } from '@/atoms';
import { useSetAtom } from 'jotai';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

export const useAuth = () => {
  const setModalAtom = useSetAtom(modalAtom);
  const t = useTranslations();

  const showLogoutConfirmModal = useCallback(() => {
    setModalAtom({
      modal: {
        type: 'confirm',
        title: t('modal.title.logout_confirm'),
        message: t('modal.message.logout_confirm'),
        handlePositiveButtonClick: () => {
          signOut();
        },
      },
    });
  }, [setModalAtom, t]);

  return { showLogoutConfirmModal };
};
