import prisma from '@/lib/prisma';
import { ListContentType } from '@/types';

// 自分の記事一覧を取得
export const getMyContents = async (
  userId: string
): Promise<ListContentType[]> => {
  try {
    const postModel = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        author: true,
        category: true,
      },
    });

    const myContents = postModel.map((content) => {
      return {
        id: content.id,
        title: content.title,
        category: content.category.category,
        userImage: content.author.image,
        published: content.published,
        updatedAt: content.updatedAt,
      };
    });
    return myContents;
  } catch (error) {
    return [];
  }
};
