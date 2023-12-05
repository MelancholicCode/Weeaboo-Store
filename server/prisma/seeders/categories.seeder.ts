import { PrismaClient, Category } from '@prisma/client';

const prisma = new PrismaClient();

export const seedCategories = async (): Promise<Category[]> => {
  try {
    const food = await prisma.category.create({
      data: {
        name: 'Food',
        slug: 'food',
      },
    });

    const cosmetics = await prisma.category.create({
      data: {
        name: 'Cosmetics',
        slug: 'cosmetics',
      },
    });

    const electronics = await prisma.category.create({
      data: {
        name: 'Electronics',
        slug: 'electronics',
      },
    });

    const manga = await prisma.category.create({
      data: {
        name: 'Manga',
        slug: 'manga',
      },
    });

    const householdGoods = await prisma.category.create({
      data: {
        name: 'Household Goods',
        slug: 'household-goods',
      },
    });

    const categories = [food, cosmetics, electronics, manga, householdGoods];

    console.log('Categories seeded successfully');
    console.log(categories);
    return categories;
  } catch (error) {
    console.error('Error seeding categories:', error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
};
