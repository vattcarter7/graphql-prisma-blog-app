import 'cross-fetch/polyfill';
import ApolloBoost, { gql } from 'apollo-boost';
import bcrypt from 'bcryptjs'
import prisma from '../src/prisma';

const client = new ApolloBoost({
  uri: 'http://localhost:4000'
});

beforeEach(async () => {
  await prisma.mutation.deleteManyUsers();
  await prisma.mutation.createUser({
    data: {
      name: 'Jen',
      email: 'jen@gmail.com',
      password: bcrypt.hashSync('Red!@45556')
    }
  })
});

test('Should create a new user', async () => {
  const createUser = gql`
    mutation {
      createUser(
        data: {
          name: "sopheak"
          email: "sopheak@gmail.com"
          password: "red12345"
        }
      ) {
        token
        user {
          id
        }
      }
    }
  `;

  const response = await client.mutate({
    mutation: createUser
  });

  const exists = await prisma.exists.User({ id: response.data.createUser.id });
  expect(exists).toBe(true);
});
