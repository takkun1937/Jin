import { modalAtom } from '@/atoms';
import { useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

export const useContentDelete = () => {
  const setModalAtom = useSetAtom(modalAtom);
  const t = useTranslations();

  const deleteContent = useCallback(async (contentId: number) => {
    console.log('delete content', contentId);
    // TODO: 記事削除APIを呼び出す
  }, []);

  const showContentDeleteConfirmModal = useCallback(
    (contentId: number) => {
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
