import { inferProcedureOutput } from '@trpc/server';
import ContentDeleteButton from '../delete/components/ui/ContentDeleteButton';
import ContentEditButton from '../update/components/ui/ContentEditButton';
import { AppRouter } from '@/server/routers/_app';

interface ButtonContainerProps {
  content: inferProcedureOutput<AppRouter['content']['getContentById']>;
}

export default function ButtonContainer({ content }: ButtonContainerProps) {
  return (
    <div className='flex justify-end items-center mb-6'>
      <div className='flex gap-2'>
        <ContentDeleteButton contentId={content.id} />
        <ContentEditButton content={content} />
      </div>
    </div>
  );
}
