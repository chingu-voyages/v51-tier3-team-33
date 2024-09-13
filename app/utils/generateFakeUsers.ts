import { faker }from "@faker-js/faker";

interface User {
  firstName: String,
  lastName: String,
  email: String, 
  password: String
}
 
const createFakeUser = () => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
};

export const generateFakeUsers = (length: number) => {
  const users: User[] = [];

  for (let i = 0; i < length - 1; i++) {
    users.push(createFakeUser());
  }

  return users;
};