// 投稿する記事の型
export interface PostContentType {
  title: string;
  categoryId: number;
  content: string;
  published: boolean;
}

// 取得した記事の型
export interface ListContentType {
  id: number;
  title: string;
  category: string;
  userImage: string | null;
  published: boolean;
  updatedAt: Date;
}
