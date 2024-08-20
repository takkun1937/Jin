import { mdValueAtom } from '@/atoms';
import { ContentCategoryType } from '@/types';
import { useSetAtom } from 'jotai';
import { ChangeEvent, useCallback } from 'react';

type UseMarkdownOptions = {
  onChangeMdTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeMdCategory: (
    event: ChangeEvent<HTMLSelectElement>,
    categoryList: ContentCategoryType[]
  ) => void;
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
    (
      event: ChangeEvent<HTMLSelectElement>,
      categoryList: ContentCategoryType[]
    ) => {
      // hiddenOption分のindexを引いている
      const categoryId = categoryList[event.target.selectedIndex - 1].id;
      setMdValueAtom((prev) => ({ ...prev, categoryId: categoryId }));
    },
    []
  );

  const onChangeMdContent = useCallback((value: string) => {
    setMdValueAtom((prev) => ({ ...prev, content: value }));
  }, []);

  return { onChangeMdTitle, onChangeMdCategory, onChangeMdContent };
};
