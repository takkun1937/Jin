import { modalAtom } from '@/atoms';
import { useModalHandler } from '@/hooks/useModalHandler';
import { trpc } from '@/utils/trpc';
import { useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

export const useContentDelete = () => {
  const setModalAtom = useSetAtom(modalAtom);
  const t = useTranslations();
  const deleteContentMutation = trpc.content.deleteContent.useMutation();
  const { handleCompetedModal, handleErrorModal } = useModalHandler();

  const deleteContent = useCallback(
    async (contentId: string) => {
      deleteContentMutation.mutate(
        { contentId },
        {
          onSuccess: () => {
            handleCompetedModal('deleteContent');
          },
          onError: (error) => {
            handleErrorModal(error);
          },
        },
      );
    },
    [handleCompetedModal, handleErrorModal, deleteContentMutation],
  );

  const showContentDeleteConfirmModal = useCallback(
    (contentId: string) => {
      setModalAtom({
        modal: {
          type: 'confirm',
          title: t('modal.title.content_delete_confirm'),
          message: t('modal.message.content_delete_confirm'),
          handlePositiveButtonClick: () => deleteContent(contentId),
        },
      });
    },
    [deleteContent, setModalAtom, t],
  );

  return { showContentDeleteConfirmModal };
};
