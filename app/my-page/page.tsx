import { authOptions } from '@/auth';
import { ApiPath } from '@/common/constants';
import ContentList from '@/features/contents/components/ContentList';
import { getMyContents } from '@/actions/content';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function MyPage() {
  const session = await getServerSession(authOptions);

  // セッションが存在しない場合はログイン画面に遷移
  if (!session) {
    redirect(ApiPath.SignIn);
  }

  const myContents = await getMyContents(session.user.id);

  return (
    <div className='px-8 py-6'>
      <ContentList contents={myContents} />
    </div>
  );
}
