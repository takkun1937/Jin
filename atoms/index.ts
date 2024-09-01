import { ModalType } from '@/common/constants';
import { PostContentType } from '@/types';
import { atom } from 'jotai';

// Openするモーダルの種類を保持するAtom
export const modalAtom = atom<(typeof ModalType)[keyof typeof ModalType]>(
  ModalType.None
);

// 投稿記事内容の入力値を保持するAtom
export const mdValueAtom = atom<PostContentType>({
  title: '',
  categoryId: 0,
  content: '',
  published: false,
});
