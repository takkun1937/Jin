import { modalAtom } from '@/atoms';
import { useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { useCallback } from 'react';

export const useContentUpdate = () => {
  const setModalAtom = useSetAtom(modalAtom);
  const t = useTranslations();

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

  return { showContentUpdateConfirmModal };
};
