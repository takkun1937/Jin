import { postContentSchema } from '@/server/schema/content';
import { z } from 'zod';

// 新規保存・投稿する記事の型
export type PostContentType = z.infer<typeof postContentSchema>;
