import { ContentType } from '@/types';

// 記事内容のバリデーション
export const validateMdValue = (mdValue: ContentType): boolean => {
  if (
    mdValue.title !== '' &&
    mdValue.categoryId !== 0 &&
    mdValue.content !== ''
  ) {
    return true;
  } else {
    return false;
  }
};
