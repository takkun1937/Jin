import { useCallback, useState } from 'react';

type UseMarkdownOptions = {
  mdValue: string;
  changeMdValue: (value: string) => void;
};

export const useMarkdown = (): UseMarkdownOptions => {
  const [mdValue, setMdValue] = useState('');

  const changeMdValue = useCallback((value: string) => {
    setMdValue(value);
  }, []);

  return { mdValue, changeMdValue };
};
