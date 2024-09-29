import { contentReducerAtom, modalAtom } from '@/atoms';
import { ErrorType } from '@/common/constants';
import { useModalHandler } from '@/hooks/useModalHandler';
import { createContentSchema } from '@/server/schema/content';
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
  const postContentMutation = trpc.content.postContent.useMutation();
  const saveDraftContentMutation = trpc.content.saveDraftContent.useMutation();

  // 保存記事内容のバリデーション
  const validCreateContent = useCallback(
    (postContent: CreateContentType): boolean => {
      try {
        createContentSchema.parse(postContent);
        return true;
      } catch (error) {
        console.log(error);
        handleErrorModal(new Error(ErrorType.ValidCreateContent));
        return false;
      }
    },
    [handleErrorModal],
  );

  const saveDraftContent = useCallback(() => {
    saveDraftContentMutation.mutate(contentAtomValue, {
      onSuccess: () => {
        handleCompetedModal('saveDraftContent');
      },
      onError: (error) => {
        handleErrorModal(error);
      },
    });
  }, [
    contentAtomValue,
    handleCompetedModal,
    handleErrorModal,
    saveDraftContentMutation,
  ]);

  const handleDraftContentOverwriteConfirm = useCallback(() => {
    if (validCreateContent(contentAtomValue)) {
      setModalAtom({
        modal: {
          type: 'confirm',
          title: t('modal.title.draft_content_overwrite_confirm'),
          message: t('modal.message.draft_content_overwrite_confirm'),
          handlePositiveButtonClick: saveDraftContent,
        },
      });
    }
  }, [contentAtomValue, saveDraftContent, setModalAtom, t, validCreateContent]);

  const postContent = useCallback(() => {
    postContentMutation.mutate(contentAtomValue, {
      onSuccess: () => {
        handleCompetedModal('postContent');
      },
      onError: (error) => {
        handleErrorModal(error);
      },
    });
  }, [
    contentAtomValue,
    handleCompetedModal,
    handleErrorModal,
    postContentMutation,
  ]);

  const handleContentPostConfirm = useCallback(() => {
    if (validCreateContent(contentAtomValue)) {
      setModalAtom({
        modal: {
          type: 'confirm',
          title: t('modal.title.content_post_confirm'),
          message: t('modal.message.content_post_confirm'),
          handlePositiveButtonClick: postContent,
        },
      });
    }
  }, [contentAtomValue, postContent, setModalAtom, t, validCreateContent]);

  return { handleDraftContentOverwriteConfirm, handleContentPostConfirm };
};
