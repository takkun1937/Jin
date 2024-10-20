import ContentDeleteButton from '../delete/components/ui/ContentDeleteButton';
import ContentEditButton from '../update/components/ui/ContentEditButton';
import { useTranslations } from 'next-intl';
import { ContentType } from '@/types';

interface ButtonContainerProps {
  content: ContentType;
}

export default function ButtonContainer({ content }: ButtonContainerProps) {
  const t = useTranslations();

  return (
    <div className='flex justify-between items-center'>
      <p className='text-gray_black font-bold'>
        {content.published ? t('public') : t('private')}
      </p>
      <div className='flex gap-2'>
        <ContentDeleteButton contentId={content.id} />
        <ContentEditButton content={content} />
      </div>
    </div>
  );
}
