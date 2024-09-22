import ErrorModal from '@/components/modal/ErrorModal';
import { useTranslations } from 'next-intl';

export default function GetContentCategoryErrorModal() {
  const t = useTranslations();
  return <ErrorModal contents={t('get_content_category_error_message')} />;
}
