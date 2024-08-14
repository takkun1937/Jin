'use client';

import MDEditor from '@uiw/react-md-editor';
import { useMarkdown } from '../hooks/useMarkdown';
import { useAtomValue } from 'jotai';
import { mdValueAtom } from '@/atoms';

export default function MarkdownEditor() {
  const { changeMdContent } = useMarkdown();
  const mdContentAtomValue = useAtomValue(mdValueAtom);

  return (
    <MDEditor
      value={mdContentAtomValue.content}
      onChange={(value) => changeMdContent(value || '')}
      height={'100%'}
    />
  );
}
