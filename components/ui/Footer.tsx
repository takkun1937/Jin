import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();

  return (
    <footer className='flex justify-between items-center px-8 py-12 bg-gray-700'>
      <p className='font-bold text-4xl text-white'>{t('app_name')}</p>
      <p className='text-white'>{t('copy_right')}</p>
    </footer>
  );
}
