import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";
import { PrismaClient } from "../generated/prisma/client.ts";

export const prisma = new PrismaClient({
  adapter: new PrismaMariaDb({ connectionString: process.env.DATABASE_URL }),
});
