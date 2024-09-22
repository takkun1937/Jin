import ErrorModal from '@/components/modal/ErrorModal';
import { useTranslations } from 'next-intl';

export default function GetContentsErrorModal() {
  const t = useTranslations();
  return <ErrorModal contents={t('get_contents_error_message')} />;
}
