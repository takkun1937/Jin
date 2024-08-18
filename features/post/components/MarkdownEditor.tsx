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
import { postCategoryFetcher } from '@/lib/axios';

export default function MarkdownEditor() {
  const { changeMdTitle, changeMdCategory, changeMdContent } = useMarkdown();
  const mdContentAtomValue = useAtomValue(mdValueAtom);
  const t = useTranslations();
  const { data } = useSWR(ApiPath.PostCategory, postCategoryFetcher);

  return (
    <div className='flex flex-col gap-2 h-full'>
      <div className='flex gap-2'>
        <Input
          className='flex-1'
          placeholder={t('article_title')}
          onChange={changeMdTitle}
        />
        <Dropdown
          hiddenOption={t('select_category')}
          options={data ?? []}
          onChange={changeMdCategory}
        />
      </div>
      <MDEditor
        value={mdContentAtomValue.content}
        onChange={(value) => changeMdContent(value || '')}
        style={{ flexGrow: 1 }}
      />
    </div>
  );
}
