'use client';

import Button from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { useContentUpdate } from '../../hooks/useContentUpdate';
import { ContentSchemaType, ContentType } from '@/types';

interface ContentEditButtonProps {
  content: ContentType;
}

export default function ContentEditButton({ content }: ContentEditButtonProps) {
  const t = useTranslations();
  const { handleContentEditNavigate } = useContentUpdate();
  const editContent: ContentSchemaType = {
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
