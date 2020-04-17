import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from './resolvers/index';
const prisma = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: 'thisismysupersecrettext',
  fragmentReplacements
});

export { prisma as default };
