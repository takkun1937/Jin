import {
  deleteContent,
  getContentById,
  getContentCategory,
  getContentList,
  getMyContentList,
  postContent,
  saveDraftContent,
  updateContent,
  updateDraftContent,
} from '@/server/services/contentService';
import { procedure, router } from '../trpc';
import { ZodError } from 'zod';
import { protectedProcedure } from '../middleware';
import {
  contentSchema,
  deleteContentSchema,
  getContentByIdSchema,
  getContentListSchema,
  updateContentSchema,
  updateDraftContentSchema,
} from '../schema/content';
import { ErrorType } from '@/common/constants';

export const contentRouter = router({
  getContentList: procedure.input(getContentListSchema).query(async (opts) => {
    const limit = opts.input.limit ?? 30;
    const cursor = opts.input.cursor ?? undefined;
    const data = await getContentList(limit, cursor);
    return data;
  }),
  getContentById: procedure.input(getContentByIdSchema).query(async (opts) => {
    const contentId = opts.input.contentId;
    const data = await getContentById(contentId);
    return data;
  }),
  getMyContentList: protectedProcedure
    .input(getContentListSchema)
    .query(async (opts) => {
      const userId = opts.ctx.session.user.id;
      const limit = opts.input.limit ?? 30;
      const cursor = opts.input.cursor ?? undefined;
      const data = await getMyContentList(userId, limit, cursor);
      return data;
    }),
  getContentCategory: protectedProcedure.query(async () => {
    const categories = await getContentCategory();
    return categories;
  }),
  getMyContentById: protectedProcedure
    .input(getContentByIdSchema)
    .query(async (opts) => {
      const contentId = opts.input.contentId;
      const data = await getContentById(contentId);
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
    .input(updateDraftContentSchema)
    .mutation(async (opts) => {
      const contentId = opts.input.contentId;
      const content = opts.input.content;
      const userId = opts.ctx.session.user.id;
      await updateDraftContent(content, contentId, userId);
    }),
  updateContent: protectedProcedure
    .input(updateContentSchema)
    .mutation(async (opts) => {
      const contentId = opts.input.contentId;
      const content = opts.input.content;
      await updateContent(content, contentId);
    }),
  deleteContent: protectedProcedure
    .input(deleteContentSchema)
    .mutation(async (opts) => {
      const contentId = opts.input.contentId;
      await deleteContent(contentId);
    }),
});
