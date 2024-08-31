import { modalAtom } from '@/atoms';
import { ModalType } from '@/common/constants';
import Modal from '@/components/modal/Modal';
import { useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';

export default function ValidateMdValueErrorModal() {
  const t = useTranslations();
  const setModalAtom = useSetAtom(modalAtom);

  return (
    <Modal
      title={t('validate_error')}
      contents={t('validate_md_error_message')}
      hasNegativeButton={false}
      handlePositiveButtonClick={() => setModalAtom(ModalType.None)}
    />
  );
}
