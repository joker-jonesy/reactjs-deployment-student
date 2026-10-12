const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.task.createMany({
    data: [
      { title: 'Build the Express API', notes: 'Five routes: list, get, create, update, delete' },
      { title: 'Connect React to the API', notes: 'fetch + useEffect + context' },
      { title: 'Deploy to Netlify', notes: 'Static site + one serverless function', done: true },
    ],
  });
}
main().finally(() => prisma.$disconnect());
