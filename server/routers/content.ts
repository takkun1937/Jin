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
} from '@/services/contentService';
import { procedure, router } from '../trpc';
import { ZodError } from 'zod';
import { protectedProcedure } from '../middleware';
import {
  contentSchema,
  deleteContentSchema,
  getContentByIdSchema,
  getMyContentListSchema,
  updateContentSchema,
  updateDraftContentSchema,
} from '../schema/content';
import { ErrorType } from '@/common/constants';

export const contentRouter = router({
  getContentList: procedure.query(async () => {
    const data = await getContentList();
    return data;
  }),
  getContentById: procedure.input(getContentByIdSchema).query(async (opts) => {
    const contentId = opts.input.contentId;
    const data = await getContentById(contentId);
    return data;
  }),
  getMyContentList: protectedProcedure
    .input(getMyContentListSchema)
    .query(async (opts) => {
      const userId = opts.input.userId;
      const data = await getMyContentList(userId);
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
