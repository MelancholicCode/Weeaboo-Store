import { seedCategories } from './seeders/categories.seeder';
import { seedRoles } from './seeders/roles.seeder';

const seed = async () => {
  try {
    await seedCategories();
    await seedRoles();

    console.log('Seed data created successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seed();
