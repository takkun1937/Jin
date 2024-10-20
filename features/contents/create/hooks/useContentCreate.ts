import { createContentReducerAtom, modalAtom } from '@/atoms';
import { useModalHandler } from '@/hooks/useModalHandler';
import { trpc } from '@/utils/trpc';
import { useAtomValue, useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';
import { useContentValid } from '../../update/hooks/useContentValid';

export const useContentCreate = () => {
  const t = useTranslations();
  const { handleCompetedModal, handleErrorModal } = useModalHandler();
  const { validContent } = useContentValid();
  const setModalAtom = useSetAtom(modalAtom);
  const createContentAtomValue = useAtomValue(createContentReducerAtom);
  const postContentMutation = trpc.content.postContent.useMutation();
  const saveDraftContentMutation = trpc.content.saveDraftContent.useMutation();

  const saveDraftContent = useCallback(() => {
    saveDraftContentMutation.mutate(createContentAtomValue, {
      onSuccess: () => {
        handleCompetedModal('saveDraftContent');
      },
      onError: (error) => {
        handleErrorModal(error);
      },
    });
  }, [
    createContentAtomValue,
    handleCompetedModal,
    handleErrorModal,
    saveDraftContentMutation,
  ]);

  const handleDraftContentSaveConfirm = useCallback(() => {
    if (validContent(createContentAtomValue)) {
      setModalAtom({
        modal: {
          type: 'confirm',
          title: t('modal.title.draft_content_overwrite_confirm'),
          message: t('modal.message.draft_content_overwrite_confirm'),
          handlePositiveButtonClick: saveDraftContent,
        },
      });
    }
  }, [createContentAtomValue, saveDraftContent, setModalAtom, t, validContent]);

  const postContent = useCallback(() => {
    postContentMutation.mutate(createContentAtomValue, {
      onSuccess: () => {
        handleCompetedModal('postContent');
      },
      onError: (error) => {
        handleErrorModal(error);
      },
    });
  }, [
    createContentAtomValue,
    handleCompetedModal,
    handleErrorModal,
    postContentMutation,
  ]);

  const handleContentPostConfirm = useCallback(() => {
    if (validContent(createContentAtomValue)) {
      setModalAtom({
        modal: {
          type: 'confirm',
          title: t('modal.title.content_post_confirm'),
          message: t('modal.message.content_post_confirm'),
          handlePositiveButtonClick: postContent,
        },
      });
    }
  }, [createContentAtomValue, postContent, setModalAtom, t, validContent]);

  return { handleDraftContentSaveConfirm, handleContentPostConfirm };
};
