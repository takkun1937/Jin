// 投稿する記事の型
export type PostContentType = {
  title: string;
  categoryId: number;
  content: string;
  published: boolean;
};

// 取得した記事の型
export type ListContentType = {
  id: number;
  title: string;
  category: string;
  userImage: string | null;
  published: boolean;
  updatedAt: Date;
};
