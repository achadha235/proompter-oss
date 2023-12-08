import { Adapter } from "@proompter/core";
import { type PrismaClient } from "./client";
export default class ProompterPrismaAdapter implements Adapter {
  prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async test() {
    return "hello world";
  }
}
