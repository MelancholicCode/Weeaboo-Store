import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

export const seedRoles = async (): Promise<Role[]> => {
  try {
    const user = await prisma.role.create({
      data: {
        name: 'user',
      },
    });

    const admin = await prisma.role.create({
      data: {
        name: 'admin',
      },
    });

    console.log('Roles seeded successfully');
    return [user, admin];
  } catch (error) {
    console.error('Error seeding roles:', error);
    return [];
  } finally {
    await prisma.$disconnect();
  }
};
