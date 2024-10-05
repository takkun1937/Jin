import {
  deleteContent,
  getContentById,
  getContentCategory,
  getMyContentList,
  postContent,
  saveDraftContent,
  updateContent,
  updateDraftContent,
} from '@/services/contentService';
import { router } from '../trpc';
import { z, ZodError } from 'zod';
import { protectedProcedure } from '../middleware';
import { contentSchema } from '../schema/content';
import { ErrorType } from '@/common/constants';

export const contentRouter = router({
  getContentCategory: protectedProcedure.query(async () => {
    const categories = await getContentCategory();
    return categories;
  }),
  getContentById: protectedProcedure
    .input(z.object({ contentId: z.number() }))
    .query(async (opts) => {
      const contentId = opts.input.contentId;
      const data = await getContentById(contentId);
      return data;
    }),
  getMyContentList: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async (opts) => {
      const userId = opts.input.userId;
      const data = await getMyContentList(userId);
      return data;
    }),
  saveDraftContent: protectedProcedure
    .input(contentSchema)
    .mutation(async (opts) => {
      const content = opts.input;
      const userId = opts.ctx.session.user.id;
      await saveDraftContent(content, userId);
    }),
  postContent: protectedProcedure
    .input(contentSchema)
    .mutation(async (opts) => {
      try {
        const content = opts.input;
        const userId = opts.ctx.session.user.id;
        await postContent(content, userId);
      } catch (error) {
        if (error instanceof ZodError) {
          error.issues[0].message = ErrorType.ValidContent;
        }
        throw error;
      }
    }),
  updateDraftContent: protectedProcedure
    .input(
      z.object({
        contentId: z.number(),
        content: contentSchema,
      }),
    )
    .mutation(async (opts) => {
      const contentId = opts.input.contentId;
      const content = opts.input.content;
      const userId = opts.ctx.session.user.id;
      await updateDraftContent(content, contentId, userId);
    }),
  updateContent: protectedProcedure
    .input(z.object({ contentId: z.number(), content: contentSchema }))
    .mutation(async (opts) => {
      const contentId = opts.input.contentId;
      const content = opts.input.content;
      await updateContent(content, contentId);
    }),
  deleteContent: protectedProcedure
    .input(z.object({ contentId: z.number() }))
    .mutation(async (opts) => {
      const contentId = opts.input.contentId;
      await deleteContent(contentId);
    }),
});
