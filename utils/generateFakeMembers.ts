import { faker } from '@faker-js/faker';

interface Member {
    id: number;
    name: string;
    email: string;
    venmo: string;
}

const createFakeMember = (): Member => {
    return {
      id: Math.random(),
      name: faker.person.firstName(),
      email: faker.internet.email(),
      venmo: faker.internet.userName(),
    };
}

export const generateFakeMembers = (length: number) => {
  const members: Member[] = [];

  for (let i = 0; i < length; i++) {
    members.push(createFakeMember());
  }

  return members;
};
