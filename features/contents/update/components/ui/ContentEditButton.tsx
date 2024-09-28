'use client';

import Button from '@/components/ui/Button';
import { useTranslations } from 'next-intl';
import { useContentUpdate } from '../../hooks/useContentUpdate';

interface ContentEditButtonProps {
  contentId: number;
}

export default function ContentEditButton({
  contentId,
}: ContentEditButtonProps) {
  const t = useTranslations();
  const { showContentUpdateConfirmModal } = useContentUpdate();

  return (
    <Button
      visual='white_text_secondary'
      onClick={() => showContentUpdateConfirmModal(contentId)}
    >
      {t('button.edit')}
    </Button>
  );
}
