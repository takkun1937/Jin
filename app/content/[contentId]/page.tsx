import ContentView from '@/features/contents/read/components/ContentView';
import { createCaller } from '@/server/routers/_app';

export default async function Content({
  params,
}: {
  params: { contentId: string };
}) {
  const caller = createCaller({ session: null });
  const content = await caller.getContentById({
    contentId: params.contentId,
  });

  return (
    <div className='px-8 py-6'>
      <ContentView content={content} />
    </div>
  );
}
