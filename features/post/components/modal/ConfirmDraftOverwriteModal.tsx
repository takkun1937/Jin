import { mdValueAtom, modalAtom } from '@/atoms';
import { ModalType } from '@/common/constants';
import Modal from '@/components/modal/Modal';
import { postContent } from '@/lib/axios';
import { useAtomValue, useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';

export default function ConfirmDraftOverwriteModal() {
  const t = useTranslations();
  const mdValueAtomValue = useAtomValue(mdValueAtom);
  const setModalAtom = useSetAtom(modalAtom);

  // 下書き保存処理
  const handlePositiveButtonClick = async () => {
    try {
      await postContent(mdValueAtomValue);
      setModalAtom(ModalType.Success);
    } catch (error) {
      console.error(error);
      setModalAtom(ModalType.Error);
    }
  };

  return (
    <Modal
      title={t('save_draft_content')}
      contents={t('overwrite_draft_content_confirm_message')}
      handlePositiveButtonClick={handlePositiveButtonClick}
    />
  );
}
