import Button from '../ui/Button';
import { useAtom } from 'jotai';
import { modalAtom } from '@/atoms';
import { useTranslations } from 'next-intl';
import { CompletedModalType } from '@/types';
import { RESET } from 'jotai/utils';

export default function CompletedModal() {
  const t = useTranslations();
  const [modalAtomValue, setModalAtom] = useAtom(modalAtom);
  const modal = modalAtomValue.modal as CompletedModalType;

  return (
    <div className='flex flex-col gap-2 min-w-[30%] px-8 py-12 rounded bg-background'>
      <p className='font-lg'>{modal.title}</p>
      <p>{modal.message}</p>
      <div className='flex justify-end gap-2'>
        <Button onClick={() => setModalAtom(RESET)}>{t('button.ok')}</Button>
      </div>
    </div>
  );
}
