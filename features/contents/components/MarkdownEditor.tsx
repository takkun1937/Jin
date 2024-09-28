'use client';

import MDEditor from '@uiw/react-md-editor';
import { useAtom } from 'jotai';
import { contentReducerAtom } from '@/atoms';
import { useTranslations } from 'next-intl';
import Input from '@/components/ui/Input';
import Dropdown from '@/components/ui/Dropdown';
import { useMarkdownEditor } from '../hooks/useMarkdownEditor';

export default function MarkdownEditor() {
  const t = useTranslations();
  const [contentAtomValue, contentDispatch] = useAtom(contentReducerAtom);
  const { contentCategories } = useMarkdownEditor();

  return (
    <div className='flex flex-col gap-2 h-full'>
      <div className='flex gap-2'>
        <Input
          className='flex-1'
          placeholder={t('content_title')}
          value={contentAtomValue.title}
          onChange={(e) =>
            contentDispatch({
              type: 'changeTitle',
              payload: e.target.value,
            })
          }
        />
        <Dropdown
          hiddenOption={t('select_category')}
          options={contentCategories.map((category) => category.category)}
          // hiddenOption分のindexを引く
          value={contentCategories[contentAtomValue.categoryId - 1]?.category}
          onChange={(e) =>
            contentDispatch({
              type: 'changeCategory',
              payload: contentCategories[e.target.selectedIndex - 1]?.id,
            })
          }
        />
      </div>
      <MDEditor
        value={contentAtomValue.content}
        onChange={(value) =>
          contentDispatch({ type: 'changeContent', payload: value ?? '' })
        }
        style={{ flexGrow: 1 }}
      />
    </div>
  );
}
