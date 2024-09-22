import { postContentSchema } from '@/server/schema/content';
import { PostContentType } from '@/types';

// 新規記事内容のバリデーション
export const validatePostContent = (postContent: PostContentType): boolean => {
  try {
    postContentSchema.parse(postContent);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// 日付のフォーマット
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
