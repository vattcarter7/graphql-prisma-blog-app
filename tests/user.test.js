import 'cross-fetch/polyfill';
import prisma from '../src/prisma';
import seedDatabase, { userOne } from './utils/seedDatabase';
import getClient from './utils/getClient';
import { createUser, getUsers, login, getProfile } from './utils/operations';

const client = getClient();

beforeEach(seedDatabase, 20000);

test('Should create a new user', async () => {
  const variables = {
    data: {
      name: 'Sopheak',
      email: 'sopheak@gmail.com',
      password: 'red12345'
    }
  };

  const response = await client.mutate({
    mutation: createUser,
    variables
  });

  const exists = await prisma.exists.User({ id: response.data.createUser.id });
  expect(exists).toBe(true);
});

test('Should expose public author profiles', async () => {
  const response = await client.query({ query: getUsers });

  expect(response.data.users.length).toBe(2);
  expect(response.data.users[0].email).toBe(null);
  expect(response.data.users[0].name).toBe('Jen');
});

test('Should not login with bad credentials', async () => {
  const variables = {
    data: {
      email: 'jen@gmail.com',
      password: 'red0981234badpass'
    }
  };

  await expect(client.mutate({ mutation: login, variables })).rejects.toThrow();
});

test('Should not signup user with invalid password', async () => {
  const variables = {
    data: {
      name: 'carter',
      email: 'carter@gmail.com',
      password: 'pass'
    }
  };

  await expect(
    client.mutate({ mutation: createUser, variables })
  ).rejects.toThrow();
});

test('Should fetch user profile', async () => {
  const client = getClient(userOne.jwt);
  const { data } = await client.query({ query: getProfile });

  expect(data.me.id).toBe(userOne.user.id);
  expect(data.me.name).toBe(userOne.user.name);
  expect(data.me.email).toBe(userOne.user.email);
});
