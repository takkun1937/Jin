import { authOptions } from '@/auth';
import { ResponseErrorType } from '@/common/constants';
import prisma from '@/lib/prisma';
import {
  ErrorResponse,
  PostMyContentsRequest,
  PostMyContentsResponse,
} from '@/types/api';
import { validateMdValue } from '@/utils/utils';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

// DBへ記事投稿内容の保存
export async function POST(
  request: Request,
): Promise<NextResponse<PostMyContentsResponse | ErrorResponse>> {
  try {
    const body: PostMyContentsRequest = await request.json();
    const session = await getServerSession(authOptions);

    // セッションが存在しない場合はエラーレスポンスを返却
    if (!session) {
      return NextResponse.json(
        { message: ResponseErrorType.Unauthorized.message },
        { status: ResponseErrorType.Unauthorized.status },
      );
    }

    // リクエストボディのバリデーション
    if (!validateMdValue(body)) {
      return NextResponse.json(
        { message: ResponseErrorType.BadRequest.message },
        { status: ResponseErrorType.BadRequest.status },
      );
    }

    // 下書き保存（publishedがfalse）の場合、既存の下書きを確認
    if (!body.published) {
      const existingDraft = await prisma.post.findFirst({
        where: {
          authorId: session.user.id,
          published: false,
        },
      });

      if (existingDraft) {
        // 既存の下書きを更新
        const updatedDraft = await prisma.post.update({
          where: { id: existingDraft.id },
          data: {
            title: body.title,
            content: body.content,
            categoryId: body.categoryId,
          },
        });
        return NextResponse.json(updatedDraft);
      }
    }

    // DBへの記事登録
    const result = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        categoryId: body.categoryId,
        authorId: session.user.id,
        published: body.published,
      },
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: ResponseErrorType.InternalServerError.message, error },
      { status: ResponseErrorType.InternalServerError.status },
    );
  }
}
