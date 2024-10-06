import { inferProcedureOutput } from '@trpc/server';
import ContentDeleteButton from '../delete/components/ui/ContentDeleteButton';
import ContentEditButton from '../update/components/ui/ContentEditButton';
import { AppRouter } from '@/server/routers/_app';
import { useTranslations } from 'next-intl';

interface ButtonContainerProps {
  content: inferProcedureOutput<AppRouter['content']['getContentById']>;
}

export default function ButtonContainer({ content }: ButtonContainerProps) {
  const t = useTranslations();

  return (
    <div className='flex justify-between items-center mb-6'>
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
