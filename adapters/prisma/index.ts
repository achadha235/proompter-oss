import { Adapter } from "@proompter/core";
import { PrismaClient } from "./client";
export default class ProompterPrismaAdapter implements Adapter {
  prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async test() {
    return "hello world";
  }
}
