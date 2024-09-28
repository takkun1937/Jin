'use client';

import { RoutePath } from '@/common/constants';
import { AppRouter } from '@/server/routers/_app';
import { formatDate } from '@/utils/utils';
import { inferProcedureOutput } from '@trpc/server';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ContentCardProps {
  content: inferProcedureOutput<
    AppRouter['content']['getMyContentList']
  >[number];
}

export default function ContentCard({ content }: ContentCardProps) {
  const router = useRouter();

  return (
    <div
      className='flex flex-col gap-2 px-6 py-4 rounded border-2 border-gray_white bg-white cursor-pointer'
      onClick={() => router.push(`${RoutePath.MyContent}/${content.id}`)}
    >
      <div className='flex gap-2 items-center'>
        <Image
          src={content.userImage ?? ''}
          alt='user image'
          width={32}
          height={32}
          className='rounded-full'
        />
        <p>{formatDate(content.updatedAt)}</p>
      </div>
      <p className='font-lg truncate'>{content.title}</p>
      <p className='w-fit px-1.5 bg-surface'>{content.category}</p>
    </div>
  );
}
