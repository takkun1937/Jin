import {
  deleteContent,
  getContentById,
  getContentCategory,
  getMyContentList,
  postContent,
  saveDraftContent,
} from '@/services/contentService';
import { router } from '../trpc';
import { z, ZodError } from 'zod';
import { protectedProcedure } from '../middleware';
import { createContentSchema } from '../schema/content';
import { ErrorType } from '@/common/constants';

export const contentRouter = router({
  // 記事のカテゴリー取得
  getContentCategory: protectedProcedure.query(async () => {
    const categories = await getContentCategory();
    return categories;
  }),
  // idと一致する記事の内容取得
  getContentById: protectedProcedure
    .input(z.object({ contentId: z.number() }))
    .query(async (opts) => {
      const contentId = opts.input.contentId;
      const data = await getContentById(contentId);
      return data;
    }),
  // 自分の記事一覧取得
  getMyContentList: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async (opts) => {
      const userId = opts.input.userId;
      const data = await getMyContentList(userId);
      return data;
    }),
  // 非公開で記事を保存
  saveDraftContent: protectedProcedure
    .input(createContentSchema)
    .mutation(async (opts) => {
      const content = opts.input;
      const userId = opts.ctx.session.user.id;
      await saveDraftContent(content, userId);
    }),
  // 記事の新規投稿・保存
  postContent: protectedProcedure
    .input(createContentSchema)
    .mutation(async (opts) => {
      try {
        const content = opts.input;
        const userId = opts.ctx.session.user.id;
        await postContent(content, userId);
      } catch (error) {
        if (error instanceof ZodError) {
          error.issues[0].message = ErrorType.ValidCreateContent;
        }
        throw error;
      }
    }),
  // 記事の削除
  deleteContent: protectedProcedure
    .input(z.object({ contentId: z.number() }))
    .mutation(async (opts) => {
      const contentId = opts.input.contentId;
      await deleteContent(contentId);
    }),
});
