import { ContentType } from '@/types';

export const initialContent: ContentType = {
  title: '',
  categoryId: 0,
  content: '',
};

type Action =
  | { type: 'changeTitle'; payload: string }
  | { type: 'changeCategory'; payload: number }
  | { type: 'changeContent'; payload: string }
  | { type: 'changeContentObject'; payload: ContentType };

export const contentReducer = (prev: ContentType, action: Action) => {
  switch (action.type) {
    case 'changeTitle': {
      return { ...prev, title: action.payload };
    }
    case 'changeCategory': {
      return { ...prev, categoryId: action.payload };
    }
    case 'changeContent': {
      return { ...prev, content: action.payload };
    }
    case 'changeContentObject': {
      return action.payload;
    }
    default: {
      return prev;
    }
  }
};
