import ErrorModal from '@/components/modal/ErrorModal';
import { useTranslations } from 'next-intl';

export default function PostContentValidateErrorModal() {
  const t = useTranslations();
  return <ErrorModal contents={t('content_validate_error_message')} />;
}
