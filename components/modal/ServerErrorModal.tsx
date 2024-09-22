import ErrorModal from '@/components/modal/ErrorModal';
import { useTranslations } from 'next-intl';

export default function ServerErrorModal() {
  const t = useTranslations();
  return <ErrorModal contents={t('server_error_message')} />;
}
