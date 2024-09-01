// DBに登録されている記事の型
export type PostModel = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  categoryId: number;
};

// 投稿する記事の型
export type PostContentType = {
  title: string;
  categoryId: number;
  content: string;
  published: boolean;
};

// 取得した記事の型
export type ContentType = {
  id: number;
  title: string;
  categoryId: number;
  content: string;
  published: boolean;
};
