'use client';

import MDEditor from '@uiw/react-md-editor';
import { useAtom } from 'jotai';
import { postContentReducerAtom } from '@/atoms';
import { useTranslations } from 'next-intl';
import Input from '@/components/ui/Input';
import Dropdown from '@/components/ui/Dropdown';
import { useMarkdownEditor } from '../hooks/useMarkdownEditor';

export default function MarkdownEditor() {
  const t = useTranslations();
  const [postContentAtomValue, postContentDispatch] = useAtom(
    postContentReducerAtom,
  );
  const { contentCategories } = useMarkdownEditor();

  return (
    <div className='flex flex-col gap-2 h-full'>
      <div className='flex gap-2'>
        <Input
          className='flex-1'
          placeholder={t('content_title')}
          value={postContentAtomValue.title}
          onChange={(e) =>
            postContentDispatch({
              type: 'changeTitle',
              payload: e.target.value,
            })
          }
        />
        <Dropdown
          hiddenOption={t('select_category')}
          options={contentCategories.map((category) => category.category)}
          // hiddenOption分のindexを引く
          value={
            contentCategories[postContentAtomValue.categoryId - 1]?.category
          }
          onChange={(e) =>
            postContentDispatch({
              type: 'changeCategory',
              payload: contentCategories[e.target.selectedIndex - 1]?.id,
            })
          }
        />
      </div>
      <MDEditor
        value={postContentAtomValue.content}
        onChange={(value) =>
          postContentDispatch({ type: 'changeContent', payload: value ?? '' })
        }
        style={{ flexGrow: 1 }}
      />
    </div>
  );
}
