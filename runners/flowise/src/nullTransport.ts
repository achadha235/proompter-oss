import fs from "fs";
import winston from "winston";

export const nullTransport = new winston.transports.Stream({
  stream: fs.createWriteStream("/dev/null"),
});
