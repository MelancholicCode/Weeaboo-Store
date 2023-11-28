import { seedCountries } from './seeders/countries.seeder';
import { seedLanguages } from './seeders/languages.seeder';
import { seedCategories } from './seeders/categories.seeder';
import { seedRoles } from './seeders/roles.seeder';

const seed = async () => {
  try {
    const countries = await seedCountries();
    console.log(Object.values(countries));

    const languages = await seedLanguages(countries);
    console.log(Object.values(languages));

    const categories = await seedCategories(languages);
    console.log(categories);

    const roles = await seedRoles();
    console.log(roles);

    console.log('Seed data created successfully');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seed();
