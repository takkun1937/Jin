import ReactDOM from 'react-dom';
import { useAtomValue } from 'jotai';
import { modalAtom } from '@/atoms';
import { ModalType } from '@/common/constants';
import CompletedModal from './CompletedModal';
import ConfirmModal from './ConfirmModal';
import ErrorModal from './ErrorModal';

const modal: Record<(typeof ModalType)[keyof typeof ModalType], JSX.Element> = {
  [ModalType.None]: <></>,
  [ModalType.Confirm]: <ConfirmModal />,
  [ModalType.Completed]: <CompletedModal />,
  [ModalType.Error]: <ErrorModal />,
};

export default function ModalWrapper() {
  const modalAtomValue = useAtomValue(modalAtom);

  if (modalAtomValue.modal === ModalType.None) {
    return <></>;
  }

  return ReactDOM.createPortal(
    <div className='fixed top-0 left-0 z-20 flex justify-center items-center w-full h-full bg-gray_black bg-opacity-50'>
      {modal[modalAtomValue.modal.type]}
    </div>,
    document.getElementById('modal_root') as HTMLElement,
  );
}
