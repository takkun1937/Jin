'use client';

import MDEditor from '@uiw/react-md-editor';
import { useMarkdown } from '../hooks/useMarkdown';
import { useAtomValue } from 'jotai';
import { mdValueAtom } from '@/atoms';
import { useTranslations } from 'next-intl';
import Input from '@/components/ui/Input';
import Dropdown from '@/components/ui/Dropdown';
import useSWR from 'swr';
import { ApiPath } from '@/common/constants';
import { contentCategoryFetcher } from '@/lib/axios';
import { ChangeEvent, useEffect } from 'react';

export default function MarkdownEditor() {
  const { onChangeMdTitle, onChangeMdCategory, onChangeMdContent } =
    useMarkdown();
  const mdContentAtomValue = useAtomValue(mdValueAtom);
  const t = useTranslations();
  const { data } = useSWR(ApiPath.ContentCategory, contentCategoryFetcher, {
    fallbackData: [],
  });

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

  return (
    <div className='flex flex-col gap-2 h-full'>
      <div className='flex gap-2'>
        <Input
          className='flex-1'
          placeholder={t('content_title')}
          value={mdContentAtomValue.title}
          onChange={onChangeMdTitle}
        />
        <Dropdown
          hiddenOption={t('select_category')}
          options={data}
          getOptionLabel={(option) => option.category}
          // hiddenOption分のindexを引く
          value={data[mdContentAtomValue.categoryId - 1].category}
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            onChangeMdCategory(data[e.target.selectedIndex - 1].id)
          }
        />
      </div>
      <MDEditor
        value={mdContentAtomValue.content}
        onChange={(value) => onChangeMdContent(value || '')}
        style={{ flexGrow: 1 }}
      />
    </div>
  );
}
