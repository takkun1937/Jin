import ReactDOM from 'react-dom';
import { useAtomValue } from 'jotai';
import { modalAtom } from '@/atoms';
import { ModalType } from '@/common/constants';
import ValidateMdValueErrorModal from '@/features/post/components/modal/ValidateMdValueErrorModal';
import LogoutModal from '@/features/auth/components/modal/LogoutModal';
import PostContentModal from '@/features/post/components/modal/PostContentModal';
import SuccessModal from './SuccessModal';
import ErrorModal from './ErrorModal';
import ConfirmDraftOverwriteModal from '@/features/post/components/modal/ConfirmDraftOverwriteModal';

const modal: Record<(typeof ModalType)[keyof typeof ModalType], JSX.Element> = {
  [ModalType.None]: <></>,
  [ModalType.Success]: <SuccessModal />,
  [ModalType.Error]: <ErrorModal />,
  [ModalType.Logout]: <LogoutModal />,
  [ModalType.PostContent]: <PostContentModal />,
  [ModalType.ConfirmDraftOverwrite]: <ConfirmDraftOverwriteModal />,
  [ModalType.ValidateMdValueError]: <ValidateMdValueErrorModal />,
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
    document.getElementById('modal_root') as HTMLElement
  );
}
