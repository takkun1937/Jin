import { authOptions } from '@/auth';
import { RoutePath } from '@/common/constants';
import ContentList from '@/features/contents/read/components/ContentList';
import { createCaller } from '@/server/routers/_app';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function MyContentList() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(RoutePath.Login);
  }

  const caller = createCaller({ session });
  const myContents = await caller.getMyContentList({ userId: session.user.id });

  return (
    <div className='px-8 py-6'>
      <ContentList contents={myContents} />
    </div>
  );
}
