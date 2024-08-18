import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const category = await prisma.postCategory.createMany({
    data: [
      { category: 'HTML/CSS' },
      { category: 'JavaScript' },
      { category: 'TypeScript' },
      { category: 'React' },
      { category: 'Vue' },
      { category: 'Angular' },
      { category: 'Next.js' },
      { category: 'Nest.js' },
      { category: 'Node.js' },
      { category: 'Express' },
      { category: 'その他(フロントエンド)' },
      { category: 'その他' },
    ],
  });
  console.log({ category });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
