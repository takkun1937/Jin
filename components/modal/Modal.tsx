import { HTMLAttributes } from 'react';
import Button from '../ui/Button';
import { useSetAtom } from 'jotai';
import { modalAtom } from '@/atoms';
import { useTranslations } from 'next-intl';
import { ModalType } from '@/common/constants';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  contents?: string;
  hasNegativeButton?: boolean;
  handlePositiveButtonClick?: () => void;
}

export default function Modal({
  title = '',
  contents = '',
  hasNegativeButton = true,
  handlePositiveButtonClick,
  className = '',
  children,
  ...props
}: ModalProps) {
  const setModalTypeAtom = useSetAtom(modalAtom);
  const t = useTranslations();

  return (
    <div
      className={`flex flex-col gap-2 min-w-[30%] px-8 py-12 rounded bg-background ${className}`}
      {...props}
    >
      <p className='font_large'>{title}</p>
      <p>{contents}</p>
      <div className='flex justify-end gap-2'>
        {hasNegativeButton && (
          <Button
            visual='white_text_gray'
            onClick={() => setModalTypeAtom(ModalType.None)}
          >
            {t('cancel')}
          </Button>
        )}
        {handlePositiveButtonClick && (
          <Button onClick={handlePositiveButtonClick}>{t('ok')}</Button>
        )}
      </div>
    </div>
  );
}
