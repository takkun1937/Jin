import { HTMLAttributes } from 'react';
import Button from '../ui/Button';
import { useSetAtom } from 'jotai';
import { modalAtom } from '@/atoms';
import { useTranslations } from 'next-intl';
import { ModalType } from '@/common/constants';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  contents: string;
  handlePositiveButtonClick: () => void;
}

export default function Modal({
  title,
  contents,
  handlePositiveButtonClick,
  className,
  ...props
}: ModalProps) {
  const setModalAtom = useSetAtom(modalAtom);
  const t = useTranslations();

  return (
    <div
      className={`flex flex-col gap-2 min-w-[30%] px-8 py-12 rounded bg-background ${className}`}
      {...props}
    >
      <p className='font-lg'>{title}</p>
      <p>{contents}</p>
      <div className='flex justify-end gap-2'>
        <Button
          visual='white_text_gray'
          onClick={() => setModalAtom(ModalType.None)}
        >
          {t('cancel')}
        </Button>
        <Button onClick={handlePositiveButtonClick}>{t('ok')}</Button>
      </div>
    </div>
  );
}
