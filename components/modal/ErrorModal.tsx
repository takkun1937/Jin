import { useTranslations } from 'next-intl';
import Modal from './Modal';
import { useSetAtom } from 'jotai';
import { modalAtom } from '@/atoms';
import { ModalType } from '@/common/constants';

export default function ErrorModal() {
  const t = useTranslations();
  const setModalTypeAtom = useSetAtom(modalAtom);

  return (
    <Modal
      title={t('error')}
      contents={t('error_message')}
      hasNegativeButton={false}
      handlePositiveButtonClick={() => setModalTypeAtom(ModalType.None)}
    />
  );
}
