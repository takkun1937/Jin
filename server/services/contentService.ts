import { ErrorType } from '@/common/constants';
import prisma from '@/lib/prisma';
import { ContentSchemaType } from '@/types';
import { TRPCError } from '@trpc/server';

export const getContentList = async (
  limit: number,
  cursor: string | undefined,
) => {
  try {
    const posts = await prisma.post.findMany({
      take: limit + 1,
      where: {
        published: true,
      },
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        author: true,
        category: true,
      },
    });
    let nextCursor: typeof cursor | undefined = undefined;
    if (posts.length > limit) {
      const nextItem = posts.pop();
      nextCursor = nextItem!.id;
    }

    const contents = posts.map((content) => {
      return {
        id: content.id,
        title: content.title,
        category: content.category.category,
        userImage: content.author.image,
        published: content.published,
        updatedAt: content.updatedAt,
      };
    });

    return { contents, nextCursor };
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: ErrorType.GetContentList,
    });
  }
};

export const getMyContentList = async (
  userId: string,
  limit: number,
  cursor: string | undefined,
) => {
  try {
    const posts = await prisma.post.findMany({
      take: limit + 1,
      where: {
        authorId: userId,
      },
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        author: true,
        category: true,
      },
    });
    let nextCursor: typeof cursor | undefined = undefined;
    if (posts.length > limit) {
      const nextItem = posts.pop();
      nextCursor = nextItem!.id;
    }

    const contents = posts.map((content) => {
      return {
        id: content.id,
        title: content.title,
        category: content.category.category,
        userImage: content.author.image,
        published: content.published,
        updatedAt: content.updatedAt,
      };
    });
    return { contents, nextCursor };
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: ErrorType.GetContentList,
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

export const getContentById = async (contentId: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: contentId,
      },
      include: {
        author: true,
        category: true,
      },
    });

    if (!post) {
      throw new Error();
    }

    const content = {
      id: post.id,
      title: post.title,
      content: post.content,
      categoryId: post.categoryId,
      category: post.category.category,
      userImage: post.author.image,
      published: post.published,
      updatedAt: post.updatedAt,
    };
    return content;
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: ErrorType.GetContentById,
    });
  }
};

export const saveDraftContent = async (
  content: ContentSchemaType,
  userId: string,
) => {
  try {
    await prisma.$transaction(async (prisma) => {
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
    });
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: ErrorType.SaveContent,
    });
  }
};

export const postContent = async (
  content: ContentSchemaType,
  userId: string,
) => {
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
      message: ErrorType.SaveContent,
    });
  }
};

export const updateDraftContent = async (
  content: ContentSchemaType,
  contentId: string,
  userId: string,
) => {
  try {
    await prisma.$transaction(async (prisma) => {
      await prisma.post.update({
        where: { id: contentId },
        data: {
          title: content.title,
          content: content.content,
          categoryId: content.categoryId,
          published: false,
        },
      });

      const draftContents = await prisma.post.findMany({
        where: {
          authorId: userId,
          published: false,
        },
      });

      if (draftContents.length > 1) {
        const deleteContentIdList = draftContents
          .filter((draft) => draft.id !== contentId)
          .map((draft) => draft.id);

        await prisma.post.deleteMany({
          where: { id: { in: deleteContentIdList } },
        });
      }
    });
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: ErrorType.UpdateContent,
    });
  }
};

export const updateContent = async (
  content: ContentSchemaType,
  contentId: string,
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
      message: ErrorType.UpdateContent,
    });
  }
};

export const deleteContent = async (contentId: string) => {
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
