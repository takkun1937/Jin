import { ErrorType } from '@/common/constants';
import prisma from '@/lib/prisma';
import { ContentType } from '@/types';
import { TRPCError } from '@trpc/server';

export const getContentList = async () => {
  try {
    const postModel = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        author: true,
        category: true,
      },
    });

    const contents = postModel.map((content) => {
      return {
        id: content.id,
        title: content.title,
        category: content.category.category,
        userImage: content.author.image,
        published: content.published,
        updatedAt: content.updatedAt,
      };
    });

    return contents;
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: ErrorType.ServerError,
    });
  }
};

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

export const saveDraftContent = async (
  content: ContentType,
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

export const postContent = async (content: ContentType, userId: string) => {
  try {
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

export const updateDraftContent = async (
  content: ContentType,
  contentId: number,
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
      await prisma.post.delete({
        where: { id: existingDraft.id },
      });
    }

    await prisma.post.update({
      where: { id: contentId },
      data: {
        title: content.title,
        content: content.content,
        categoryId: content.categoryId,
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

export const updateContent = async (
  content: ContentType,
  contentId: number,
) => {
  try {
    // DBへ記事の更新
    const updatedContent = await prisma.post.update({
      where: {
        id: contentId,
      },
      data: {
        title: content.title,
        content: content.content,
        categoryId: content.categoryId,
        published: true,
      },
    });

    return updatedContent;
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: ErrorType.ServerError,
    });
  }
};

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
