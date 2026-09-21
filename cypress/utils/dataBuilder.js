import { faker } from '@faker-js/faker';

/**
 * Generates a password that always satisfies:
 * - Minimum 12 characters
 * - At least one uppercase letter
 * - At least one number
 * - At least one special character
 */
const generatePassword = () => {
  const uppercase = faker.string.alpha({ length: 1, casing: 'upper' });
  const lowercase = faker.string.alpha({ length: 8, casing: 'lower' });
  const number = faker.string.numeric(1);
  const special = faker.helpers.arrayElement(['@', '#', '$', '&']);
  const extra = faker.string.alphanumeric(4);
  return faker.helpers
      .shuffle((uppercase + lowercase + number + special + extra).split(''))
      .join('');
};

export const registrationData = () => {
  return {
    nameOfUser: faker.person.firstName(),
    emailAddress: faker.internet.email(),
    userPassword: generatePassword()
  };
};

export const generateArticleData = () => {
  return {
    articleTitle: faker.lorem.sentence({ min: 3, max: 8 }),
    articleDescription: faker.lorem.sentence({ min: 8, max: 15 }),
    articleBody: faker.lorem.paragraphs(2, '\n\n'),
    articleTag: faker.word.sample().toLowerCase()
  };
};
