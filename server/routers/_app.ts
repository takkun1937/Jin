import { createCallerFactory, router } from '../trpc';
import { contentRouter } from './content';

export const appRouter = router({
  content: contentRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export const createCaller = createCallerFactory(contentRouter);
