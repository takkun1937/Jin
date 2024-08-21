import { ModalType } from '@/common/constants';
import { ContentType } from '@/types';
import { atom } from 'jotai';

// Openするモーダルの種類を保持するAtom
export const modalAtom = atom<(typeof ModalType)[keyof typeof ModalType]>(
  ModalType.None
);

// 記事内容の入力値を保持するAtom
export const mdValueAtom = atom<ContentType>({
  title: '',
  categoryId: 0,
  content: '',
  published: false,
});
