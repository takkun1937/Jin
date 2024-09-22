import {
  getContentCategory,
  getMyContents,
  postContent,
} from '@/services/contentService';
import { router } from '../trpc';
import { z, ZodError } from 'zod';
import { protectedProcedure } from '../middleware';
import { postContentSchema } from '../schema/content';
import { ErrorType } from '@/common/constants';

export const contentRouter = router({
  // 記事のカテゴリー取得
  getContentCategory: protectedProcedure.query(async () => {
    const categories = await getContentCategory();
    return categories;
  }),
  // 自分の記事一覧取得
  getMyContents: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async (opts) => {
      const userId = opts.input.userId;
      const data = await getMyContents(userId);
      return data;
    }),
  // 記事の新規投稿・保存
  postContent: protectedProcedure
    .input(postContentSchema)
    .mutation(async (opts) => {
      try {
        const content = opts.input;
        const userId = opts.ctx.session.user.id;
        await postContent(content, userId);
      } catch (error) {
        if (error instanceof ZodError) {
          error.issues[0].message = ErrorType.PostContentValidate;
        }
        throw error;
      }
    }),
});
