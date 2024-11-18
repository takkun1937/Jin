import prisma from '../lib/prisma';

async function main() {
  const categoriesToAdd = [
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
    { category: '初心者向け' },
  ];

  // データベース内の既存のカテゴリーを取得
  const existingCategories = await prisma.postCategory.findMany({
    select: { category: true }, // 必要なフィールドだけ取得
  });

  // 既存のカテゴリー名を配列に変換
  const existingCategoryNames = existingCategories.map((c) => c.category);

  // 追加が必要なカテゴリーをフィルタリング
  const newCategories = categoriesToAdd.filter(
    (c) => !existingCategoryNames.includes(c.category),
  );

  if (newCategories.length > 0) {
    const addedCategories = await prisma.postCategory.createMany({
      data: newCategories,
    });
    console.log(`Added categories:`, addedCategories);
  } else {
    console.log('No new categories to add.');
  }
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
