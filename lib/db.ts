// lib/prisma.ts
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

// Extend the global object with a prisma property
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// Instantiate PrismaClient or use the existing global instance
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    // Optional: Configure logging for better observability
    log: ["query", "info", "warn", "error"],
  });

// In development, store the instance globally to prevent multiple instances during hot-reloading
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
