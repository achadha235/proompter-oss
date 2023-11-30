import { Proompter } from "@proompter/core";
import { PrismaClient } from "@prisma/client";
export default class ProompterPrismaAdapter implements Proompter.Adapter {
  prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  async test() {
    return "hello world";
  }
}
