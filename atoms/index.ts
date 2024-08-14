import { atom } from 'jotai';

export const mdValueAtom = atom<{
  title: string;
  category: string;
  content: string;
  published: boolean;
}>({ title: '', category: '', content: '', published: false });
