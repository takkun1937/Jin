import { ListContentType } from '@/types';

type ContentCardProps = {
  content: ListContentType;
};

export default function ContentCard(props: ContentCardProps) {
  const content = props.content;
  const contentUpdatedAt = content.updatedAt.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='flex flex-col gap-2 px-6 py-4 rounded border-2 border-gray_white bg-white cursor-pointer'>
      <div className='flex gap-2 items-center'>
        <img
          src={content.userImage ?? ''}
          alt='user image'
          className='user-image'
        />
        <p>{contentUpdatedAt}</p>
      </div>
      <p className='font-lg truncate'>{content.title}</p>
      <p className='w-fit px-1.5 bg-surface'>{content.category}</p>
    </div>
  );
}
