import { mdValueAtom, modalAtom } from '@/atoms';
import { ModalType } from '@/common/constants';
import Modal from '@/components/modal/Modal';
import { postContent } from '@/lib/axios';
import { useAtomValue, useSetAtom } from 'jotai';
import { useTranslations } from 'next-intl';

export default function PostContentModal() {
  const t = useTranslations();
  const mdValueAtomValue = useAtomValue(mdValueAtom);
  const setModalTypeAtom = useSetAtom(modalAtom);

  // 記事投稿処理
  const handlePositiveButtonClick = async () => {
    if (await postContent(mdValueAtomValue)) {
      setModalTypeAtom(ModalType.Success);
    } else {
      setModalTypeAtom(ModalType.Error);
    }
  };

  return (
    <Modal
      title={t('post_content')}
      contents={t('post_content_confirm_message')}
      handlePositiveButtonClick={handlePositiveButtonClick}
    />
  );
}
