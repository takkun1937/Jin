import { authOptions } from '@/auth';
import { RoutePath } from '@/common/constants';
import MarkdownEditor from '@/features/contents/components/MarkdownEditor';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function MyContentEdit() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(RoutePath.Login);
  }

  return (
    <div className='h-full px-4 py-3'>
      <MarkdownEditor />
    </div>
  );
}
