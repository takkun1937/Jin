import { ModalType } from '@/common/constants';
import { AppRouter } from '@/server/routers/_app';
import { contentSchema } from '@/server/schema/content';
import { inferProcedureOutput } from '@trpc/server';
import { z } from 'zod';

export type Modal =
  | ConfirmModalType
  | CompletedModalType
  | ErrorModalType
  | typeof ModalType.None;

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
export type ContentSchemaType = z.infer<typeof contentSchema>;

export type ContentListType = inferProcedureOutput<
  AppRouter['content']['getContentList']
>['contents'];

export type ContentType = inferProcedureOutput<
  AppRouter['content']['getContentById']
>;
