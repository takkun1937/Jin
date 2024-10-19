import { authOptions } from '@/auth';
import { RoutePath } from '@/common/constants';
import ContentListContainer from '@/features/contents/read/components/ContentListContainer';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function MyContentList() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(RoutePath.Login);
  }

  return (
    <div className='px-8 py-6'>
      <ContentListContainer isMyContent={true} />
    </div>
  );
}
