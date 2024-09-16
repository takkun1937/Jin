import prisma from '@/lib/prisma';
import { formatDate } from '@/utils/utils';

// 自分の記事一覧を取得
export const getMyContents = async (userId: string) => {
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
        updatedAt: formatDate(content.updatedAt),
      };
    });
    return myContents;
  } catch (error) {
    console.log(error);
    return [];
  }
};
