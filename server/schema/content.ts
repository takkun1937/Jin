import { z } from 'zod';

// 非公開で記事を保存する場合のスキーマ
export const saveDraftContentSchema = z.object({
  title: z.string(),
  categoryId: z.number().int().nonnegative(),
  content: z.string(),
});

// 記事を新たに投稿・保存する場合のスキーマ
export const postContentSchema = z.object({
  title: z.string().min(1).max(255),
  categoryId: z.number().int().positive(),
  content: z.string().min(1),
});
