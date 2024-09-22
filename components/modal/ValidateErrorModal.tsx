import ErrorModal from '@/components/modal/ErrorModal';
import { useTranslations } from 'next-intl';

export default function ValidateErrorModal() {
  const t = useTranslations();
  return <ErrorModal contents={t('validate_error_message')} />;
}
