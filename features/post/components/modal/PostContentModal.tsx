import { mdValueAtom, modalAtom } from '@/atoms';
import { ModalType } from '@/common/constants';
import Modal from '@/components/modal/Modal';
import { postContent } from '@/lib/axios';
import { useAtomValue, useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

export default function PostContentModal() {
  const t = useTranslations();
  const mdValueAtomValue = useAtomValue(mdValueAtom);
  const setModalAtom = useSetAtom(modalAtom);
  const mdValueAtomValueRef = useRef(mdValueAtomValue);

  // 記事投稿処理
  const handlePositiveButtonClick = async () => {
    mdValueAtomValueRef.current.published = true;
    try {
      await postContent(mdValueAtomValueRef.current);
      setModalAtom(ModalType.Success);
    } catch (error) {
      console.error(error);
      setModalAtom(ModalType.Error);
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
