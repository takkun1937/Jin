'use client';

import Button from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { inferProcedureOutput } from '@trpc/server';
import { AppRouter } from '@/server/routers/_app';
import { useContentUpdate } from '../../hooks/useContentUpdate';
import { ContentType } from '@/types';

interface ContentEditButtonProps {
  content: inferProcedureOutput<AppRouter['content']['getContentById']>;
}

export default function ContentEditButton({ content }: ContentEditButtonProps) {
  const t = useTranslations();
  const { handleContentEditNavigate } = useContentUpdate();
  const editContent: ContentType = {
    title: content.title,
    content: content.content,
    categoryId: content.categoryId,
  };

  return (
    <Button
      onClick={() => {
        handleContentEditNavigate(editContent, content.id);
      }}
    >
      {t('button.edit')}
    </Button>
  );
}
