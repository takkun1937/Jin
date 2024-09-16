import { AppRouter } from '@/server/routers/_app';
import { inferProcedureOutput } from '@trpc/server';
import Image from 'next/image';

interface ContentCardProps {
  content: inferProcedureOutput<AppRouter['getMyContents']>[number];
}

export default function ContentCard(props: ContentCardProps) {
  const content = props.content;

  return (
    <div className='flex flex-col gap-2 px-6 py-4 rounded border-2 border-gray_white bg-white cursor-pointer'>
      <div className='flex gap-2 items-center'>
        <Image
          src={content.userImage ?? ''}
          alt='user image'
          width={32}
          height={32}
          className='rounded-full'
        />
        <p>{content.updatedAt}</p>
      </div>
      <p className='font-lg truncate'>{content.title}</p>
      <p className='w-fit px-1.5 bg-surface'>{content.category}</p>
    </div>
  );
}
