import { modalAtom } from '@/atoms';
import { useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import Modal from './Modal';
import { ModalType } from '@/common/constants';

export default function SuccessModal() {
  const t = useTranslations();
  const setModalTypeAtom = useSetAtom(modalAtom);

  return (
    <Modal
      title={t('success')}
      contents={t('success_message')}
      hasNegativeButton={false}
      handlePositiveButtonClick={() => setModalTypeAtom(ModalType.None)}
    />
  );
}
