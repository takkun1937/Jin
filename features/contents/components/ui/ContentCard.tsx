import { ContentType } from '@/types';

type ContentCardProps = {
  content: ContentType;
};

export default function ContentCard(props: ContentCardProps) {
  return (
    <div>
      <p>{props.content.title}</p>
      <p>{props.content.content}</p>
    </div>
  );
}
