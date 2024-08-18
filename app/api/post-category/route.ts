import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// GET /api/post-category
export async function GET() {
  const categories = await prisma.postCategory.findMany();
  return Response.json(categories);
}
