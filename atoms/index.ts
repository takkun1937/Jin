import { ContentType } from '@/types';
import { atom } from 'jotai';

export const mdValueAtom = atom<ContentType>({
  title: '',
  categoryId: 0,
  content: '',
  published: false,
});
