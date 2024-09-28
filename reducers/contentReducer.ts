import { CreateContentType } from '@/types';

export const initialContent: CreateContentType = {
  title: '',
  categoryId: 0,
  content: '',
};

type Action =
  | { type: 'changeTitle'; payload: string }
  | { type: 'changeCategory'; payload: number }
  | { type: 'changeContent'; payload: string };

export const contentReducer = (prev: CreateContentType, action: Action) => {
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
