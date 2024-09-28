import ContentDeleteButton from '../delete/components/ui/ContentDeleteButton';
import ContentEditButton from '../update/components/ui/ContentEditButton';

interface ButtonContainerProps {
  contentId: number;
}

export default function ButtonContainer({ contentId }: ButtonContainerProps) {
  return (
    <div className='flex justify-end items-center mb-6'>
      <div className='flex gap-2'>
        <ContentDeleteButton contentId={contentId} />
        <ContentEditButton contentId={contentId} />
      </div>
    </div>
  );
}
