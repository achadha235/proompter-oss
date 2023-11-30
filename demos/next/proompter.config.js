import prisma from "./src/database";

import ProompterPrismaAdapter from "@proompter/adapter-prisma";

const config = {
  adapter: new ProompterPrismaAdapter(prisma),
};

export default config;
