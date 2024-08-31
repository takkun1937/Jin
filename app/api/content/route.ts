import { options } from '@/auth';
import { ResponseErrorType } from '@/common/constants';
import { validateMdValue } from '@/common/utils';
import prisma from '@/lib/prisma';
import {
  ErrorResponse,
  PostContentRequest,
  PostContentResponse,
} from '@/types/api';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

// DBへ記事投稿内容の保存
export async function POST(
  request: Request
): Promise<NextResponse<PostContentResponse | ErrorResponse>> {
  try {
    const body: PostContentRequest = await request.json();
    const session = await getServerSession(options);

    // セッションが存在しない場合はエラーレスポンスを返却
    if (!session) {
      return NextResponse.json(
        { message: ResponseErrorType.Unauthorized.message },
        { status: ResponseErrorType.Unauthorized.status }
      );
    }

    // リクエストボディのバリデーション
    if (!validateMdValue(body)) {
      return NextResponse.json(
        { message: ResponseErrorType.BadRequest.message },
        { status: ResponseErrorType.BadRequest.status }
      );
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
      { message: ResponseErrorType.InternalServerError.message },
      { status: ResponseErrorType.InternalServerError.status }
    );
  }
}
