import { z } from 'zod';

export const contentSchema = z.object({
  title: z.string().min(1).max(255),
  categoryId: z.number().int().positive(),
  content: z.string().min(1).max(20000),
});

export const getContentByIdSchema = z.object({
  contentId: z.string().cuid(),
});

export const getContentListSchema = z.object({
  limit: z.number().min(1).max(30).nullish(),
  cursor: z.string().nullish(),
});

export const updateDraftContentSchema = z.object({
  contentId: z.string().cuid(),
  content: contentSchema,
});

export const updateContentSchema = z.object({
  contentId: z.string().cuid(),
  content: contentSchema,
});

export const deleteContentSchema = z.object({
  contentId: z.string().cuid(),
});
