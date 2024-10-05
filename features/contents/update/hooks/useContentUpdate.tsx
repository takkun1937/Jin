import { modalAtom, updateContentReducerAtom } from '@/atoms';
import { RoutePath } from '@/common/constants';
import { ContentType } from '@/types';
import { useAtom, useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useContentValid } from './useContentValid';
import { trpc } from '@/utils/trpc';
import { useModalHandler } from '@/hooks/useModalHandler';

export const useContentUpdate = () => {
  const setModalAtom = useSetAtom(modalAtom);
  const t = useTranslations();
  const router = useRouter();
  const params = useParams<{ contentId: string }>();
  const [updateContentAtomValue, updateContentDispatch] = useAtom(
    updateContentReducerAtom,
  );
  const { validContent } = useContentValid();
  const { handleCompetedModal, handleErrorModal } = useModalHandler();
  const updateContentMutation = trpc.content.updateContent.useMutation();
  const updateDraftContentMutation =
    trpc.content.updateDraftContent.useMutation();

  const updateDraftContent = useCallback(async () => {
    const contentId = parseInt(params.contentId, 10);
    updateDraftContentMutation.mutate(
      { content: updateContentAtomValue, contentId },
      {
        onSuccess: () => {
          handleCompetedModal('updateDraftContent');
        },
        onError: (error) => {
          handleErrorModal(error);
        },
      },
    );
  }, []);

  const handleDraftContentUpdateConfirm = useCallback(() => {
    if (validContent(updateContentAtomValue)) {
      setModalAtom({
        modal: {
          type: 'confirm',
          title: t('modal.title.draft_content_overwrite_confirm'),
          message: t('modal.message.draft_content_overwrite_confirm'),
          handlePositiveButtonClick: updateDraftContent,
        },
      });
    }
  }, [
    setModalAtom,
    t,
    updateContentAtomValue,
    updateDraftContent,
    validContent,
  ]);

  const updateContent = useCallback(async () => {
    const contentId = parseInt(params.contentId, 10);
    updateContentMutation.mutate(
      { content: updateContentAtomValue, contentId },
      {
        onSuccess: () => {
          handleCompetedModal('updateContent');
        },
        onError: (error) => {
          handleErrorModal(error);
        },
      },
    );
  }, [
    handleCompetedModal,
    handleErrorModal,
    params.contentId,
    updateContentAtomValue,
    updateContentMutation,
  ]);

  const handleContentUpdateConfirm = useCallback(() => {
    if (validContent(updateContentAtomValue)) {
      setModalAtom({
        modal: {
          type: 'confirm',
          title: t('modal.title.content_update_confirm'),
          message: t('modal.message.content_update_confirm'),
          handlePositiveButtonClick: () => updateContent(),
        },
      });
    }
  }, [validContent, updateContentAtomValue, setModalAtom, t, updateContent]);

  const handleContentEditNavigate = useCallback(
    (content: ContentType, contentId: number) => {
      updateContentDispatch({ type: 'changeContentObject', payload: content });
      router.push(`${RoutePath.MyContentEdit}/${contentId}`);
    },
    [updateContentDispatch, router],
  );

  return {
    handleDraftContentUpdateConfirm,
    handleContentUpdateConfirm,
    handleContentEditNavigate,
  };
};
