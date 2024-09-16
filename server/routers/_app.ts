import { z } from 'zod';
import { createCallerFactory, procedure, router } from '../trpc';
import { getMyContents } from '@/server/actions/content';

export const appRouter = router({
  getMyContents: procedure.input(z.string()).query(async (opts) => {
    const data = await getMyContents(opts.input);
    return data;
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(appRouter);
