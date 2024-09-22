import Modal from '@/components/modal/Modal';
import { signOut } from 'next-auth/react';
import { useTranslations } from 'next-intl';

export default function LogoutConfirmModal() {
  const t = useTranslations();

  return (
    <Modal
      title={t('logout')}
      contents={t('logout_confirm_message')}
      handlePositiveButtonClick={signOut}
    />
  );
}
