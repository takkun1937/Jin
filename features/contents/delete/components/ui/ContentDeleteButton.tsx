'use client';

import Button from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { useContentDelete } from '../../hooks/useContentDelete';

interface ContentDeleteButtonProps {
  contentId: number;
}

export default function ContentDeleteButton({
  contentId,
}: ContentDeleteButtonProps) {
  const t = useTranslations();
  const { showContentDeleteConfirmModal } = useContentDelete();

  return (
    <Button
      visual='white_text_secondary'
      onClick={() => showContentDeleteConfirmModal(contentId)}
    >
      {t('button.delete')}
    </Button>
  );
}
