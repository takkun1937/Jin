'use client';

import { AppRouter } from '@/server/routers/_app';
import { inferProcedureOutput } from '@trpc/server';
import MDEditor from '@uiw/react-md-editor';

interface ContentViewProps {
  content: inferProcedureOutput<AppRouter['content']['getContentById']>;
}

export default function ContentView({ content }: ContentViewProps) {
  return (
    <div className='flex flex-col gap-4'>
      <h1 className='text-3xl'>{content.title}</h1>
      <MDEditor.Markdown source={content.content} />
    </div>
  );
}
