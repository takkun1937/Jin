'use client';

import Button from '@/components/ui/Button';
import ContentList from './ui/ContentList';
import { useTranslations } from 'next-intl';
import { useContentListRead } from '../hooks/useContentListRead';

interface ContentListContainerProps {
  isMyContent: boolean;
}

export default function ContentListContainer({
  isMyContent,
}: ContentListContainerProps) {
  const t = useTranslations();
  const { data, loadMoreContentList } = useContentListRead({
    isMyContent,
  });

  const contentList = data?.pages.flatMap((page) => page.contents) ?? [];
  const nextCursor = data?.pages[data.pages.length - 1].nextCursor;

  return (
    <div>
      <ContentList isMyContent={isMyContent} contents={contentList} />
      <div className='mt-6 text-center'>
        {nextCursor && (
          <Button visual='secondary' onClick={loadMoreContentList}>
            {t('button.load_more')}
          </Button>
        )}
      </div>
    </div>
  );
}
