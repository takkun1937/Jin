import { ModalType } from '@/common/constants';
import { initialContent, contentReducer } from '@/reducers/contentReducer';
import { CompletedModalType, ConfirmModalType, ErrorModalType } from '@/types';
import { atomWithReducer, atomWithReset } from 'jotai/utils';

type Modal =
  | ConfirmModalType
  | CompletedModalType
  | ErrorModalType
  | typeof ModalType.None;

interface modalAtomType {
  modal: Modal;
}

// Openするモーダルの種類を保持するAtom
export const modalAtom = atomWithReset<modalAtomType>({
  modal: ModalType.None,
});

// 新規投稿・保存記事内容の入力値を保持するAtom
export const contentReducerAtom = atomWithReducer(
  initialContent,
  contentReducer,
);
