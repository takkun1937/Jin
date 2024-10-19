'use client';

import { ContentType } from '@/types';
import { formatDate } from '@/utils/utils';
import MDEditor from '@uiw/react-md-editor';
import Image from 'next/image';

interface ContentViewProps {
  content: ContentType;
}

export default function ContentView({ content }: ContentViewProps) {
  return (
    <div className='flex flex-col gap-4 px-14 py-8 rounded border-2 border-gray_white bg-white'>
      <div className='flex flex-col gap-2'>
        <Image
          src={content.userImage ?? ''}
          alt='user image'
          width={32}
          height={32}
          className='rounded-full'
        />
        <h1 className='font-xl'>{content.title}</h1>
        <p className='w-fit px-1.5 bg-surface'>{content.category}</p>
        <p className='text-gray-500'>{formatDate(content.updatedAt)}</p>
      </div>
      <MDEditor.Markdown source={content.content} />
    </div>
  );
}
