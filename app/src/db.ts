// create Prisma client so we can use everywhere in our app
// instead of having to do this everytime we need it
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export default prismaClient;
