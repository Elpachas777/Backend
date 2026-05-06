import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";
import { PrismaClient } from "../../generated/prisma/client.ts";

const globalPrisma = globalThis;

if (!globalPrisma.prisma) {
  const adapter = new PrismaMariaDb({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: Number(process.env.DATABASE_PORT),
    connectionLimit: 10
    ,
  });

  globalPrisma.prisma = new PrismaClient({ adapter });
}

export const prisma = globalPrisma.prisma;
