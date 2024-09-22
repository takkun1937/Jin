import { modalAtom, postContentReducerAtom } from '@/atoms';
import { ModalType } from '@/common/constants';
import Modal from '@/components/modal/Modal';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { trpc } from '@/utils/trpc';
import { useAtomValue, useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

export default function PostContentModal() {
  const t = useTranslations();
  const setModalAtom = useSetAtom(modalAtom);
  const postContentAtomValue = useAtomValue(postContentReducerAtom);
  const postContentRef = useRef(postContentAtomValue);
  const { handleError } = useErrorHandler();
  const mutation = trpc.content.postContent.useMutation();

  // 記事投稿処理
  const handlePositiveButtonClick = async () => {
    postContentRef.current.published = true;
    try {
      mutation.mutate(postContentRef.current);
      setModalAtom(ModalType.Completed);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <Modal
      title={t('publish_content')}
      contents={t('publish_content_confirm_message')}
      handlePositiveButtonClick={handlePositiveButtonClick}
    />
  );
}
