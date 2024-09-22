import { z } from 'zod';

// 記事を新たに投稿・保存する場合のスキーマ
export const postContentSchema = z.object({
  title: z.string().min(1).max(255),
  categoryId: z.number().int().positive(),
  content: z.string().min(1),
  published: z.boolean(),
});
