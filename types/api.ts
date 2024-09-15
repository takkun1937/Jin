import { PostContentType } from '.';

// DBから記事カテゴリ一覧取得レスポンス
export type GetContentCategoryResponse = {
  id: number;
  category: string;
}[];

// DBへ記事投稿内容の保存リクエストレスポンス
export type PostMyContentsRequest = PostContentType;
export interface PostMyContentsResponse {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  categoryId: number;
}

export interface ErrorResponse {
  message: string;
}
