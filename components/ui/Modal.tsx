import { HTMLAttributes } from 'react';
import ReactDOM from 'react-dom';
import Button from './Button';
import { useTranslations } from 'next-intl';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isShowModal: boolean;
  title: string;
  contents: string;
  handleNegativeButtonClick?: () => void;
  handlePositiveButtonClick?: () => void;
}

export default function Modal({
  isShowModal,
  title,
  contents,
  handleNegativeButtonClick,
  handlePositiveButtonClick,
  className = '',
  children,
  ...props
}: ModalProps) {
  if (!isShowModal) {
    return <></>;
  }

  const t = useTranslations();

  return ReactDOM.createPortal(
    <div
      className={`fixed top-0 left-0 z-20 flex justify-center items-center w-full h-full bg-gray_black bg-opacity-50 ${className}`}
      {...props}
    >
      <div className='flex flex-col gap-2 min-w-[30%] px-8 py-12 rounded bg-background'>
        <p className='font_large'>{title}</p>
        <p>{contents}</p>
        <div className='flex justify-end gap-2'>
          {handleNegativeButtonClick && (
            <Button
              visual='white_text_gray'
              onClick={handleNegativeButtonClick}
            >
              {t('cancel')}
            </Button>
          )}
          {handlePositiveButtonClick && (
            <Button onClick={handlePositiveButtonClick}>{t('ok')}</Button>
          )}
        </div>
      </div>
    </div>,
    document.getElementById('modal_root') as HTMLElement
  );
}
