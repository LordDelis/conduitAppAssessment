import { faker } from '@faker-js/faker';

/**
 * Generates a password that always satisfies:
 * - Minimum 12 characters
 * - At least one uppercase letter
 * - At least one number
 * - At least one special character
 */
const generateStrongPassword = () => {
  const uppercase = faker.string.alpha({ length: 1, casing: 'upper' });
  const lowercase = faker.string.alpha({ length: 8, casing: 'lower' });
  const number = faker.string.numeric(1);
  const special = faker.helpers.arrayElement(['@', '#', '$', '&']);
  const extra = faker.string.alphanumeric(4);
  return faker.helpers
      .shuffle((uppercase + lowercase + number + special + extra).split(''))
      .join('');
};

export const generateRegistrationData = () => {
  return {
    merchantFirstName: faker.person.firstName(),
    merchantLastName: faker.person.lastName(),
    businessEmailAddress: faker.internet.email(),
    merchantPassword: generateStrongPassword(),
    merchantGender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
    merchantPhoneNumber:
        faker.helpers.arrayElement(["90", "80", "81"]) +
        faker.string.numeric(8),
    businessName: faker.company.name().replace(/[^a-zA-Z0-9 ]/g, '')
  };
};

export const generateKycData = () => {
  return {

  };
};
