'use client'; // Error components must be Client Components

import Button from '@/components/ui/Button';
import { useErrorHandler } from '@/hooks/useErrorHandler';
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
  const { handleError } = useErrorHandler();

  useEffect(() => {
    handleError(error);
  }, []);

  return (
    <div className='flex justify-center items-center w-full h-full'>
      <Button onClick={() => reset()}>{t('try_again')}</Button>
    </div>
  );
}
