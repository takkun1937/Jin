import Button from '../ui/Button';
import { useAtom } from 'jotai';
import { modalAtom } from '@/atoms';
import { useTranslations } from 'next-intl';
import { ConfirmModalType } from '@/types';
import { RESET } from 'jotai/utils';

export default function ConfirmModal() {
  const t = useTranslations();
  const [modalAtomValue, setModalAtom] = useAtom(modalAtom);
  const modal = modalAtomValue.modal as ConfirmModalType;

  return (
    <div className='flex flex-col gap-2 min-w-[30%] px-8 py-12 rounded bg-background'>
      <p className='font-lg'>{modal.title}</p>
      <p>{modal.message}</p>
      <div className='flex justify-end gap-2'>
        <Button visual='white_text_gray' onClick={() => setModalAtom(RESET)}>
          {t('button.cancel')}
        </Button>
        <Button onClick={modal.handlePositiveButtonClick}>
          {t('button.ok')}
        </Button>
      </div>
    </div>
  );
}
