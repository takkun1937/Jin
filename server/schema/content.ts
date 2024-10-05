import { z } from 'zod';

export const contentSchema = z.object({
  title: z.string().min(1).max(255),
  categoryId: z.number().int().positive(),
  content: z.string().min(1),
});

export const getContentByIdSchema = z.object({
  contentId: z.number().positive(),
});

export const getMyContentListSchema = z.object({
  userId: z.string().cuid(),
});

export const updateDraftContentSchema = z.object({
  contentId: z.number().positive(),
  content: contentSchema,
});

export const updateContentSchema = z.object({
  contentId: z.number().positive(),
  content: contentSchema,
});

export const deleteContentSchema = z.object({
  contentId: z.number().positive(),
});
