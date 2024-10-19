import Grid from '@/components/ui/Grid';
import ContentCard from './ContentCard';
import { useTranslations } from 'next-intl';
import { ContentListType } from '@/types';

interface ContentListProps {
  isMyContent: boolean;
  contents: ContentListType;
}

export default function ContentList({
  isMyContent,
  contents,
}: ContentListProps) {
  const t = useTranslations();

  return (
    <div>
      <p className='mb-2 text-gray_black font-bold'>
        {isMyContent ? t('my_content_list') : t('content_list')}
      </p>
      <Grid columns={1} gap='gap-2'>
        {contents.map((content) => {
          return (
            <ContentCard
              key={content.id}
              isMyContent={isMyContent}
              content={content}
            />
          );
        })}
      </Grid>
    </div>
  );
}
