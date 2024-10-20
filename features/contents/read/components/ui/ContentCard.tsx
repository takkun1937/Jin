'use client';

import { RoutePath } from '@/common/constants';
import { ContentListType } from '@/types';
import { formatDate } from '@/utils/utils';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ContentCardProps {
  isMyContent: boolean;
  content: ContentListType[number];
}

export default function ContentCard({
  isMyContent,
  content,
}: ContentCardProps) {
  const router = useRouter();
  const t = useTranslations();

  return (
    <div
      className='flex flex-col gap-2 px-6 py-4 rounded border-2 border-gray_white bg-white cursor-pointer'
      onClick={() =>
        router.push(
          `${isMyContent ? `${RoutePath.MyContent}/${content.id}` : `${RoutePath.Content}/${content.id}`}`,
        )
      }
    >
      <div className='flex justify-between items-center'>
        <div className='flex gap-2 items-center'>
          <Image
            src={content.userImage ?? ''}
            alt='user image'
            width={32}
            height={32}
            className='rounded-full'
          />
          <p className='text-gray-500'>{formatDate(content.updatedAt)}</p>
        </div>
        {isMyContent && (
          <p className='text-gray-500'>
            {content.published ? t('public') : t('private')}
          </p>
        )}
      </div>
      <p className='font-lg truncate'>{content.title}</p>
      <p className='w-fit px-1.5 bg-surface'>{content.category}</p>
    </div>
  );
}
