import { ContentType, PostContentType, PostModel } from '@/types';

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

// PostModelの型を変換する
export const transformContentType = (contents: PostModel[]): ContentType[] => {
  return contents.map((content) => {
    return {
      id: content.id,
      title: content.title,
      categoryId: content.categoryId,
      content: content.content,
      published: content.published,
    };
  });
};
