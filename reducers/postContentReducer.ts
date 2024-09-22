import { PostContentType } from '@/types';

export const initialPostContent: PostContentType = {
  title: '',
  categoryId: 0,
  content: '',
  published: false,
};

type Action =
  | { type: 'changeTitle'; payload: string }
  | { type: 'changeCategory'; payload: number }
  | { type: 'changeContent'; payload: string };

export const postContentReducer = (prev: PostContentType, action: Action) => {
  switch (action.type) {
    case 'changeTitle':
      return { ...prev, title: action.payload };
    case 'changeCategory':
      return { ...prev, categoryId: action.payload };
    case 'changeContent':
      return { ...prev, content: action.payload };
    default:
      return prev;
  }
};
