import { ModalType } from '@/common/constants';
import { createContentSchema } from '@/server/schema/content';
import { z } from 'zod';

export interface ConfirmModalType {
  type: typeof ModalType.Confirm;
  title: string;
  message: string;
  handlePositiveButtonClick: () => void;
}

export interface CompletedModalType {
  type: typeof ModalType.Completed;
  title: string;
  message: string;
  handlePositiveButtonClick: () => void;
}

export interface ErrorModalType {
  type: typeof ModalType.Error;
  title: string;
  message: string;
}

// 新規保存・投稿する記事の型
export type CreateContentType = z.infer<typeof createContentSchema>;
