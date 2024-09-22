import Grid from '@/components/ui/Grid';
import ContentCard from './ui/ContentCard';
import { inferProcedureOutput } from '@trpc/server';
import { AppRouter } from '@/server/routers/_app';

interface ContentListProps {
  contents: inferProcedureOutput<AppRouter['content']['getMyContents']>;
}

export default function ContentList(props: ContentListProps) {
  return (
    <Grid columns={1} gap='gap-2'>
      {props.contents.map((content) => {
        return <ContentCard key={content.id} content={content} />;
      })}
    </Grid>
  );
}
