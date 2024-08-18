import { mdValueAtom } from '@/atoms';
import { useSetAtom } from 'jotai';
import { ChangeEvent, useCallback } from 'react';

type UseMarkdownOptions = {
  changeMdTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  changeMdCategory: (event: ChangeEvent<HTMLSelectElement>) => void;
  changeMdContent: (value: string) => void;
};

export const useMarkdown = (): UseMarkdownOptions => {
  const setMdValueAtom = useSetAtom(mdValueAtom);

  const changeMdTitle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setMdValueAtom((prev) => ({ ...prev, title: event.target.value }));
  }, []);

  const changeMdCategory = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setMdValueAtom((prev) => ({ ...prev, category: event.target.value }));
    },
    []
  );

  const changeMdContent = useCallback((value: string) => {
    setMdValueAtom((prev) => ({ ...prev, content: value }));
  }, []);

  return { changeMdTitle, changeMdCategory, changeMdContent };
};
