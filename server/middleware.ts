import { TRPCError } from '@trpc/server';
import { procedure } from './trpc';
import { ErrorType } from '@/common/constants';

export const protectedProcedure = procedure.use(async function isAuthed(opts) {
  const { ctx } = opts;
  if (!ctx.session) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: ErrorType.Unauthorized,
    });
  }
  return opts.next({
    ctx: {
      session: ctx.session,
    },
  });
});
