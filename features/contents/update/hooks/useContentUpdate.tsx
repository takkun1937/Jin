import { contentReducerAtom, modalAtom } from '@/atoms';
import { RoutePath } from '@/common/constants';
import { CreateContentType } from '@/types';
import { useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useContentUpdate = () => {
  const setModalAtom = useSetAtom(modalAtom);
  const t = useTranslations();
  const router = useRouter();
  const contentDispatch = useSetAtom(contentReducerAtom);

  const updateContent = useCallback(async (contentId: number) => {
    console.log('update content', contentId);
    // TODO: 記事更新APIを呼び出す
  }, []);

  const showContentUpdateConfirmModal = useCallback(
    (contentId: number) => {
      setModalAtom({
        modal: {
          type: 'confirm',
          title: t('modal.title.content_update_confirm'),
          message: t('modal.message.content_update_confirm'),
          handlePositiveButtonClick: () => updateContent(contentId),
        },
      });
    },
    [updateContent, setModalAtom, t],
  );

  const handleContentEditNavigate = useCallback(
    (content: CreateContentType, id: number) => {
      contentDispatch({ type: 'changeContentObject', payload: content });
      router.push(`${RoutePath.MyContentEdit}/${id}`);
    },
    [contentDispatch, router],
  );

  return { handleContentEditNavigate };
};
