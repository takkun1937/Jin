import { HTMLAttributes } from 'react';
import Button from '../ui/Button';
import { useSetAtom } from 'jotai';
import { modalAtom } from '@/atoms';
import { useTranslations } from 'next-intl';
import { ModalType } from '@/common/constants';

interface ErrorModalProps extends HTMLAttributes<HTMLDivElement> {
  contents: string;
}

export default function ErrorModal({
  contents,
  className,
  ...props
}: ErrorModalProps) {
  const setModalAtom = useSetAtom(modalAtom);
  const t = useTranslations();

  return (
    <div
      className={`flex flex-col gap-2 min-w-[30%] px-8 py-12 rounded bg-background ${className}`}
      {...props}
    >
      <p className='font-lg'>{t('error')}</p>
      <p>{contents}</p>
      <div className='flex justify-end gap-2'>
        <Button onClick={() => setModalAtom(ModalType.None)}>{t('ok')}</Button>
      </div>
    </div>
  );
}
