import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../../src/prisma';

const userOne = {
  input: {
    name: 'Jen',
    email: 'jen@gmail.com',
    password: bcrypt.hashSync('Red!@45556')
  },
  user: undefined,
  jwt: undefined
};

const userTwo = {
  input: {
    name: 'Mike',
    email: 'mike@gmail.com',
    password: bcrypt.hashSync('red12345Mikee')
  },
  user: undefined,
  jwt: undefined
};

const postOne = {
  input: {
    title: 'my published post',
    body: '...',
    published: true
  },
  post: undefined
};

const postTwo = {
  input: {
    title: 'my draft post',
    body: '...',
    published: false
  },
  post: undefined
};

const commentOne = {
  input: {
    text: 'Great post, thanks for sharing!'
  },
  comment: undefined
};
const commentTwo = {
  input: {
    text: 'I am glad you enjoy it!'
  },
  comment: undefined
};

const seedDatabase = async () => {
  // delete test data
  await prisma.mutation.deleteManyComments();
  await prisma.mutation.deleteManyUsers();
  await prisma.mutation.deleteManyPosts();

  // create user one
  userOne.user = await prisma.mutation.createUser({
    data: userOne.input
  });
  userOne.jwt = jwt.sign({ userId: userOne.user.id }, process.env.JWT_SECRET);

  // create user two
  userTwo.user = await prisma.mutation.createUser({
    data: userTwo.input
  });
  userTwo.jwt = jwt.sign({ userId: userTwo.user.id }, process.env.JWT_SECRET);

  // create post one
  postOne.post = await prisma.mutation.createPost({
    data: {
      ...postOne.input,
      author: {
        connect: { id: userOne.user.id }
      }
    }
  });

  // create post two
  postTwo.post = await prisma.mutation.createPost({
    data: {
      ...postTwo.input,
      author: {
        connect: { id: userOne.user.id }
      }
    }
  });

  // create comment one
  commentOne.comment = await prisma.mutation.createComment({
    data: {
      ...commentOne.input,
      author: {
        connect: {
          id: userTwo.user.id
        }
      },
      post: {
        connect: {
          id: postOne.post.id
        }
      }
    }
  });

  // create comment two
  commentTwo.comment = await prisma.mutation.createComment({
    data: {
      ...commentTwo.input,
      author: {
        connect: {
          id: userOne.user.id
        }
      },
      post: {
        connect: {
          id: postOne.post.id
        }
      }
    }
  });
};

export {
  seedDatabase as default,
  userOne,
  userTwo,
  postOne,
  postTwo,
  commentOne,
  commentTwo
};
