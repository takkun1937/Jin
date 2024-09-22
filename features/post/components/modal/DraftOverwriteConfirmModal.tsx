import { modalAtom, postContentReducerAtom } from '@/atoms';
import { ModalType } from '@/common/constants';
import Modal from '@/components/modal/Modal';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { trpc } from '@/utils/trpc';
import { useAtomValue, useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';

export default function DraftOverwriteConfirmModal() {
  const t = useTranslations();
  const postContentAtomValue = useAtomValue(postContentReducerAtom);
  const setModalAtom = useSetAtom(modalAtom);
  const { handleError } = useErrorHandler();
  const mutation = trpc.content.postContent.useMutation();

  // 下書き保存処理
  const handlePositiveButtonClick = async () => {
    try {
      mutation.mutate(postContentAtomValue);
      setModalAtom(ModalType.Completed);
    } catch (error) {
      handleError(error);
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
