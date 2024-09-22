import ReactDOM from 'react-dom';
import { useAtomValue } from 'jotai';
import { modalAtom } from '@/atoms';
import { ModalType } from '@/common/constants';
import PostContentModal from '@/features/post/components/modal/PostContentModal';
import LogoutConfirmModal from '@/features/auth/components/modal/LogoutConfirmModal';
import DraftOverwriteConfirmModal from '@/features/post/components/modal/DraftOverwriteConfirmModal';
import CompletedModal from './CompletedModal';
import PostContentValidateErrorModal from '@/features/post/components/modal/PostContentValidateErrorModal';
import ServerErrorModal from './ServerErrorModal';
import GetContentCategoryErrorModal from '@/features/post/components/modal/GetContentCategoryErrorModal';
import GetContentsErrorModal from '@/features/post/components/modal/GetContentsErrorModal';
import ValidateErrorModal from './ValidateErrorModal';

const modal: Record<(typeof ModalType)[keyof typeof ModalType], JSX.Element> = {
  [ModalType.None]: <></>,
  [ModalType.Completed]: <CompletedModal />,
  [ModalType.ServerError]: <ServerErrorModal />,
  [ModalType.GetContentCategoryError]: <GetContentCategoryErrorModal />,
  [ModalType.GetContentsError]: <GetContentsErrorModal />,
  [ModalType.LogoutConfirm]: <LogoutConfirmModal />,
  [ModalType.PostContent]: <PostContentModal />,
  [ModalType.DraftOverwriteConfirm]: <DraftOverwriteConfirmModal />,
  [ModalType.PostContentValidateError]: <PostContentValidateErrorModal />,
  [ModalType.ValidateError]: <ValidateErrorModal />,
};

export default function ModalWrapper() {
  const modalAtomValue = useAtomValue(modalAtom);

  if (modalAtomValue === ModalType.None) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className='fixed top-0 left-0 z-20 flex justify-center items-center w-full h-full bg-gray_black bg-opacity-50'>
      {modal[modalAtomValue]}
    </div>,
    document.getElementById('modal_root') as HTMLElement,
  );
}
