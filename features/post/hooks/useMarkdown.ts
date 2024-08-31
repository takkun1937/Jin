import { mdValueAtom } from '@/atoms';
import { useSetAtom } from 'jotai';
import { ChangeEvent, useCallback, useEffect } from 'react';

type UseMarkdownOptions = {
  onChangeMdTitle: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeMdCategory: (categoryId: number) => void;
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

  const onChangeMdCategory = useCallback((categoryId: number) => {
    setMdValueAtom((prev) => ({ ...prev, categoryId: categoryId }));
  }, []);

  const onChangeMdContent = useCallback((value: string) => {
    setMdValueAtom((prev) => ({ ...prev, content: value }));
  }, []);

  // 画面離脱時にアラートを表示
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // クリーンアップ関数
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return { onChangeMdTitle, onChangeMdCategory, onChangeMdContent };
};
