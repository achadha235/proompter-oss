const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const flowise = require("flowise");
const { App } = flowise;
const utils = require("flowise/dist/utils");
const DataSource = require("typeorm").DataSource;
// const flowise = require("flowise/dist/utils");
const entities = utils.databaseEntities;

const {
  postgresMigrations,
} = require("flowise/dist/database/migrations/postgres");
const targetUrl = process.env.TARGET_DB_URL;

async function start() {
  serverApp = new App();

  const remoteDataSource = new DataSource({
    type: "postgres",
    url: targetUrl,
    synchronize: false,
    migrationsRun: true,
    entities: Object.values(entities),
    migrations: postgresMigrations,
  });

  // serverApp.AppDataSource = remoteDataSource;

  const port = parseInt(process.env.PORT || "", 10) || 3001;
  const server = http.createServer(serverApp.app);

  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  await serverApp.initDatabase();
  await serverApp.config(io);
  //   console.log(port);
  return server.listen(port, () => {
    console.log(`⚡️ [server]: Flowise Server is listening at ${port}`);
  });
}

start().catch((err) => {
  console.log("Error", err);
});
