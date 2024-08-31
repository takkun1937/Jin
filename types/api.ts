import { ContentType } from '.';

// DBから記事カテゴリ一覧取得レスポンス
export type GetContentCategoryResponse = {
  id: number;
  category: string;
}[];

// DBへ記事投稿内容の保存リクエストレスポンス
export type PostContentRequest = ContentType;
export type PostContentResponse = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string | null;
  published: boolean;
  authorId: string;
  categoryId: number;
};

export type ErrorResponse = {
  message: string;
};
