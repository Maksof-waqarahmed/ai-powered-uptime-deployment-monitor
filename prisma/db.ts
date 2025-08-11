import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
    transactionOptions: {
      maxWait: 60 * 1000,
      timeout: 60 * 1000
    },
    errorFormat: 'pretty',
    // log:
    // 	process.env.NODE_ENV === 'development'
    // 		? ['query', 'error', 'warn']
    // 		: ['error'],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
