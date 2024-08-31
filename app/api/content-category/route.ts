import { options } from '@/auth';
import { ResponseErrorType } from '@/common/constants';
import prisma from '@/lib/prisma';
import { ErrorResponse, GetContentCategoryResponse } from '@/types/api';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

// DBから記事カテゴリ一覧を取得
export async function GET(): Promise<
  NextResponse<GetContentCategoryResponse | ErrorResponse>
> {
  try {
    const session = await getServerSession(options);

    // セッションが存在しない場合はエラーレスポンスを返却
    if (!session) {
      return NextResponse.json(
        { message: ResponseErrorType.Unauthorized.message },
        { status: ResponseErrorType.Unauthorized.status }
      );
    }

    const categories = await prisma.postCategory.findMany();
    return NextResponse.json(categories);
  } catch (error) {
    return NextResponse.json(
      { message: ResponseErrorType.InternalServerError.message },
      { status: ResponseErrorType.InternalServerError.status }
    );
  }
}
