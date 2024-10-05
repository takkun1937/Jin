import Grid from '@/components/ui/Grid';
import ContentCard from './ui/ContentCard';
import { inferProcedureOutput } from '@trpc/server';
import { AppRouter } from '@/server/routers/_app';

interface ContentListProps {
  isMyContent: boolean;
  contents: inferProcedureOutput<AppRouter['content']['getContentList']>;
}

export default function ContentList({
  isMyContent,
  contents,
}: ContentListProps) {
  return (
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
  );
}
