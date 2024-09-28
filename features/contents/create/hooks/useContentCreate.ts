import { contentReducerAtom, modalAtom } from '@/atoms';
import { ErrorType } from '@/common/constants';
import { useModalHandler } from '@/hooks/useModalHandler';
import { postContentSchema } from '@/server/schema/content';
import { CreateContentType } from '@/types';
import { trpc } from '@/utils/trpc';
import { useAtomValue, useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

export const useContentCreate = () => {
  const t = useTranslations();
  const { handleCompetedModal, handleErrorModal } = useModalHandler();
  const setModalAtom = useSetAtom(modalAtom);
  const contentAtomValue = useAtomValue(contentReducerAtom);
  const mutation = trpc.content.postContent.useMutation();

  // 投稿記事内容のバリデーション
  const validPostContent = useCallback(
    (postContent: CreateContentType): boolean => {
      try {
        postContentSchema.parse(postContent);
        return true;
      } catch (error) {
        console.log(error);
        handleErrorModal(new Error(ErrorType.ValidPostContent));
        return false;
      }
    },
    [handleErrorModal],
  );

  const saveDraftContent = useCallback(() => {
    try {
      mutation.mutate(contentAtomValue);
      handleCompetedModal('saveDraftContent');
    } catch (error) {
      handleErrorModal(error);
    }
  }, [contentAtomValue, handleCompetedModal, handleErrorModal, mutation]);

  const showDraftContentOverwriteConfirmModal = useCallback(() => {
    setModalAtom({
      modal: {
        type: 'confirm',
        title: t('modal.title.draft_content_overwrite_confirm'),
        message: t('modal.message.draft_content_overwrite_confirm'),
        handlePositiveButtonClick: saveDraftContent,
      },
    });
  }, [saveDraftContent, setModalAtom, t]);

  const postContent = useCallback(() => {
    try {
      mutation.mutate(contentAtomValue);
      handleCompetedModal('postContent');
    } catch (error) {
      handleErrorModal(error);
    }
  }, [contentAtomValue, handleCompetedModal, handleErrorModal, mutation]);

  const handleContentPostConfirm = useCallback(() => {
    if (validPostContent(contentAtomValue)) {
      setModalAtom({
        modal: {
          type: 'confirm',
          title: t('modal.title.content_post_confirm'),
          message: t('modal.message.content_post_confirm'),
          handlePositiveButtonClick: postContent,
        },
      });
    }
  }, [contentAtomValue, postContent, setModalAtom, t, validPostContent]);

  return { showDraftContentOverwriteConfirmModal, handleContentPostConfirm };
};
