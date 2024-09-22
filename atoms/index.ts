import { ModalType } from '@/common/constants';
import {
  initialPostContent,
  postContentReducer,
} from '@/reducers/postContentReducer';
import { atom } from 'jotai';
import { atomWithReducer } from 'jotai/utils';

// Openするモーダルの種類を保持するAtom
export const modalAtom = atom<(typeof ModalType)[keyof typeof ModalType]>(
  ModalType.None,
);

// 新規投稿・保存記事内容の入力値を保持するAtom
export const postContentReducerAtom = atomWithReducer(
  initialPostContent,
  postContentReducer,
);
