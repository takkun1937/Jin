import Button from '../ui/Button';
import { useSetAtom } from 'jotai';
import { modalAtom } from '@/atoms';
import { useTranslations } from 'next-intl';
import { ModalType } from '@/common/constants';

export default function CompletedModal() {
  const setModalAtom = useSetAtom(modalAtom);
  const t = useTranslations();

  return (
    <div className='flex flex-col gap-2 min-w-[30%] px-8 py-12 rounded bg-background'>
      <p className='font-lg'>{t('success')}</p>
      <p>{t('success_message')}</p>
      <div className='flex justify-end gap-2'>
        <Button onClick={() => setModalAtom(ModalType.None)}>{t('ok')}</Button>
      </div>
    </div>
  );
}
