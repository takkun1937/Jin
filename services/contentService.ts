import { ErrorType } from '@/common/constants';
import prisma from '@/lib/prisma';
import { PostContentType } from '@/types';
import { TRPCError } from '@trpc/server';

// 記事のカテゴリー一覧を取得
export const getContentCategory = async () => {
  try {
    const categories = await prisma.postCategory.findMany();
    return categories;
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: ErrorType.GetContentCategory,
    });
  }
};

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
        updatedAt: content.updatedAt,
      };
    });
    return myContents;
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: ErrorType.GetMyContents,
    });
  }
};

// 記事を新たに投稿・保存
export const postContent = async (content: PostContentType, userId: string) => {
  try {
    // 下書き保存（publishedがfalse）の場合、既存の下書きを確認
    if (!content.published) {
      const existingDraft = await prisma.post.findFirst({
        where: {
          authorId: userId,
          published: false,
        },
      });

      if (existingDraft) {
        // 既存の下書きを更新
        await prisma.post.update({
          where: { id: existingDraft.id },
          data: {
            title: content.title,
            content: content.content,
            categoryId: content.categoryId,
          },
        });
        return;
      }
    }

    // DBへの記事登録
    await prisma.post.create({
      data: {
        title: content.title,
        content: content.content,
        categoryId: content.categoryId,
        authorId: userId,
        published: content.published,
      },
    });
    return;
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: ErrorType.ServerError,
    });
  }
};
