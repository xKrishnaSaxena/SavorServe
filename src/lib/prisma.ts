import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // We need to use type casting for globalWithPrisma to avoid TypeScript errors
  let globalWithPrisma = global as typeof globalThis & {
    prisma?: PrismaClient; // Make prisma property optional
  };

  if (!globalWithPrisma.prisma) {
    globalWithPrisma.prisma = new PrismaClient();
  }

  prisma = globalWithPrisma.prisma;
}

export default prisma;
