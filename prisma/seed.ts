import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { email: 'admin@agilizacrm.local' },
    update: {},
    create: {
      name: 'Administrador Agiliza',
      email: 'admin@agilizacrm.local',
      password: 'admin123',
      role: 'admin',
    },
  });
}

main().finally(async () => {
  await prisma.$disconnect();
});
