import { authOptions } from '@/auth';
import { ApiPath } from '@/common/constants';
import { transformContentType } from '@/common/utils';
import ContentList from '@/features/contents/components/ContentList';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function MyPage() {
  const session = await getServerSession(authOptions);

  // セッションが存在しない場合はログイン画面に遷移
  if (!session) {
    redirect(ApiPath.SignIn);
  }

  const myContents = await prisma.post.findMany({
    where: {
      authorId: session.user.id,
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  const contents = transformContentType(myContents);

  return (
    <div className='px-8 py-6'>
      <ContentList contents={contents} />
    </div>
  );
}
