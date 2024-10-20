import { ModalType } from '@/common/constants';
import { initialContent, contentReducer } from '@/reducers/contentReducer';
import { Modal } from '@/types';
import { atomWithReducer, atomWithReset } from 'jotai/utils';

interface modalAtomType {
  modal: Modal;
}

// Openするモーダルの種類を保持するAtom
export const modalAtom = atomWithReset<modalAtomType>({
  modal: ModalType.None,
});

// 新規投稿・保存記事内容の入力値を保持するAtom
export const createContentReducerAtom = atomWithReducer(
  initialContent,
  contentReducer,
);

// 更新記事内容の入力値を保持するAtom
export const updateContentReducerAtom = atomWithReducer(
  initialContent,
  contentReducer,
);
