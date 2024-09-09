import { PostContentType } from '@/types';

// 記事内容のバリデーション
export const validateMdValue = (mdValue: PostContentType): boolean => {
  if (
    mdValue.title !== '' &&
    mdValue.title.length <= 255 &&
    mdValue.categoryId !== 0 &&
    mdValue.content !== ''
  ) {
    return true;
  } else {
    return false;
  }
};
