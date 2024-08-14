import { mdValueAtom } from '@/atoms';
import { useSetAtom } from 'jotai';
import { useCallback } from 'react';

type UseMarkdownOptions = {
  changeMdContent: (value: string) => void;
};

export const useMarkdown = (): UseMarkdownOptions => {
  const setMdValueAtom = useSetAtom(mdValueAtom);

  const changeMdContent = useCallback((value: string) => {
    setMdValueAtom((prev) => ({ ...prev, content: value }));
  }, []);

  return { changeMdContent };
};
