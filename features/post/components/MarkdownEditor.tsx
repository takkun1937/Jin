'use client';

import MDEditor from '@uiw/react-md-editor';
import { useMarkdown } from '../hooks/useMarkdown';

export default function MarkdownEditor() {
  const { mdValue, changeMdValue } = useMarkdown();

  return (
    <MDEditor
      value={mdValue}
      onChange={(value) => changeMdValue(value || '')}
      height={'100%'}
    />
  );
}
