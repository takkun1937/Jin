'use client';

import MDEditor from '@uiw/react-md-editor';
import { useAtom } from 'jotai';
import { createContentReducerAtom, updateContentReducerAtom } from '@/atoms';
import { useTranslations } from 'next-intl';
import Input from '@/components/ui/Input';
import Dropdown from '@/components/ui/Dropdown';
import { useMarkdownEditor } from '../hooks/useMarkdownEditor';

interface MarkdownEditorProps {
  isCreateContent: boolean; // 記事の新規作成か更新か判別するためのフラグ
}

export default function MarkdownEditor({
  isCreateContent,
}: MarkdownEditorProps) {
  const t = useTranslations();
  const [createContentAtomValue, createContentDispatch] = useAtom(
    createContentReducerAtom,
  );
  const [updateContentAtomValue, updateContentDispatch] = useAtom(
    updateContentReducerAtom,
  );
  const { contentCategories } = useMarkdownEditor();
  const contentDispatch = isCreateContent
    ? createContentDispatch
    : updateContentDispatch;
  const contentAtomValue = isCreateContent
    ? createContentAtomValue
    : updateContentAtomValue;

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
