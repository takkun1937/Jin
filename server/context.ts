import { authOptions } from '@/auth';
import { getServerSession } from 'next-auth';

export async function createContext() {
  const session = await getServerSession(authOptions);
  return { session };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
