'use client'; // Error components must be Client Components

import Button from '@/components/ui/Button';
import { useModalHandler } from '@/hooks/useModalHandler';
import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const t = useTranslations();
  const { handleErrorModal } = useModalHandler();

  useEffect(() => {
    handleErrorModal(error);
  }, []);

  return (
    <div className='flex justify-center items-center w-full h-full'>
      <Button onClick={() => reset()}>{t('button.try_again')}</Button>
    </div>
  );
}
