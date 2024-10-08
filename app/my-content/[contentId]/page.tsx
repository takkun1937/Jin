import { authOptions } from '@/auth';
import { RoutePath } from '@/common/constants';
import ButtonContainer from '@/features/contents/components/ButtonContainer';
import ContentView from '@/features/contents/read/components/ContentView';
import { createCaller } from '@/server/routers/_app';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function MyContent({
  params,
}: {
  params: { contentId: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(RoutePath.Login);
  }

  const caller = createCaller({ session });
  const content = await caller.getMyContentById({
    contentId: params.contentId,
  });

  return (
    <div className='px-8 py-6'>
      <ButtonContainer content={content} />
      <ContentView content={content} />
    </div>
  );
}
