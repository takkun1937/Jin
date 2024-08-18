import { mdValueAtom } from '@/atoms';
import { useSetAtom } from 'jotai';
import { ChangeEvent, useCallback } from 'react';

type UseMarkdownOptions = {
  onChangeMdTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeMdCategory: (event: ChangeEvent<HTMLSelectElement>) => void;
  onChangeMdContent: (value: string) => void;
};

export const useMarkdown = (): UseMarkdownOptions => {
  const setMdValueAtom = useSetAtom(mdValueAtom);

  const onChangeMdTitle = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setMdValueAtom((prev) => ({ ...prev, title: event.target.value }));
    },
    []
  );

  const onChangeMdCategory = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setMdValueAtom((prev) => ({ ...prev, category: event.target.value }));
    },
    []
  );

  const onChangeMdContent = useCallback((value: string) => {
    setMdValueAtom((prev) => ({ ...prev, content: value }));
  }, []);

  return { onChangeMdTitle, onChangeMdCategory, onChangeMdContent };
};
