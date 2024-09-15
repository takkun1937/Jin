import Grid from '@/components/ui/Grid';
import ContentCard from './ui/ContentCard';
import { ListContentType } from '@/types';

interface ContentListProps {
  contents: ListContentType[];
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
