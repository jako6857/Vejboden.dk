import { PrismaClient } from "../generated/prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const isProduction = (globalThis as any).process?.env?.NODE_ENV === "production";

export const prisma =
  globalForPrisma.prisma || new PrismaClient();

if (!isProduction) globalForPrisma.prisma = prisma;