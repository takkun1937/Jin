import ContentList from '@/features/contents/read/components/ContentList';
import { createCaller } from '@/server/routers/_app';

export default async function Home() {
  const caller = createCaller({ session: null });
  const contentList = await caller.getContentList();

  return (
    <div className='px-8 py-6'>
      <ContentList isMyContent={false} contents={contentList} />
    </div>
  );
}
