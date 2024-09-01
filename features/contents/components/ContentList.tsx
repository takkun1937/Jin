import Grid from '@/components/ui/Grid';
import ContentCard from './ui/ContentCard';
import { ContentType } from '@/types';

type ContentListProps = {
  contents: ContentType[];
};

export default function ContentList(props: ContentListProps) {
  return (
    <Grid columns={1} gap='gap-2'>
      {props.contents.map((content) => {
        return <ContentCard key={content.id} content={content} />;
      })}
    </Grid>
  );
}
