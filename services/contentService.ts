import { ErrorType } from '@/common/constants';
import prisma from '@/lib/prisma';
import { CreateContentType } from '@/types';
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

// idと一致する記事の内容を取得
export const getContentById = async (contentId: number) => {
  try {
    const contentModel = await prisma.post.findUnique({
      where: {
        id: contentId,
      },
      include: {
        author: true,
        category: true,
      },
    });

    if (!contentModel) {
      throw new Error();
    }

    const content = {
      id: contentModel.id,
      title: contentModel.title,
      content: contentModel.content,
      categoryId: contentModel.categoryId,
      category: contentModel.category.category,
      userImage: contentModel.author.image,
      published: contentModel.published,
      updatedAt: contentModel.updatedAt,
    };
    return content;
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: ErrorType.ServerError,
    });
  }
};

// 自分の記事一覧を取得
export const getMyContentList = async (userId: string) => {
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
      message: ErrorType.GetMyContentList,
    });
  }
};

// 記事を非公開で新たに保存または上書き
export const saveDraftContent = async (
  content: CreateContentType,
  userId: string,
) => {
  try {
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

    // DBへ非公開で記事登録
    await prisma.post.create({
      data: {
        title: content.title,
        content: content.content,
        categoryId: content.categoryId,
        authorId: userId,
        published: false,
      },
    });
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: ErrorType.ServerError,
    });
  }
};

// 記事を新たに保存し公開する
export const postContent = async (
  content: CreateContentType,
  userId: string,
) => {
  try {
    // DBへ公開で記事登録
    await prisma.post.create({
      data: {
        title: content.title,
        content: content.content,
        categoryId: content.categoryId,
        authorId: userId,
        published: true,
      },
    });
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: ErrorType.ServerError,
    });
  }
};

// 記事の削除
export const deleteContent = async (contentId: number) => {
  try {
    await prisma.post.delete({
      where: {
        id: contentId,
      },
    });
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: ErrorType.DeleteContent,
    });
  }
};
