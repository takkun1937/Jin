import { PostContentType, PostModel } from '.';

// DBから記事カテゴリ一覧取得レスポンス
export type GetContentCategoryResponse = {
  id: number;
  category: string;
}[];

// DBへ記事投稿内容の保存リクエストレスポンス
export type PostMyContentsRequest = PostContentType;
export type PostMyContentsResponse = PostModel;

export type ErrorResponse = {
  message: string;
};
