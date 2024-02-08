import "reflect-metadata";
import path from "path";

import typeorm from "typeorm";
const DataSource = require("typeorm").DataSource;

import { getUserHome } from "./utils";
import { sqliteMigrations } from "@proompter/flowise/dist/database/migrations/sqlite";
import { mysqlMigrations } from "@proompter/flowise/dist/database/migrations/mysql";
import { postgresMigrations } from "@proompter/flowise/dist/database/migrations/postgres";
import databaseEntities from "@proompter/flowise/dist/database/entities";

const entities = databaseEntities.entities;

let appDataSource: typeorm.DataSource;

export const init = async (): Promise<void> => {
  let homePath;
  switch (process.env.PROOMPTER_FLOWISE_DATABASE_TYPE) {
    case "sqlite":
      homePath =
        process.env.PROOMPTER_FLOWISE_DATABASE_PATH ??
        path.join(getUserHome(), ".flowise");
      appDataSource = new DataSource({
        type: "sqlite",
        database: path.resolve(homePath, "database.sqlite"),
        synchronize: false,
        migrationsRun: false,
        entities: Object.values(entities),
        migrations: sqliteMigrations,
      });
      break;
    case "mysql":
      appDataSource = new DataSource({
        type: "mysql",
        host: process.env.PROOMPTER_FLOWISE_DATABASE_HOST,
        port: parseInt(process.env.PROOMPTER_FLOWISE_DATABASE_PORT || "3306"),
        username: process.env.PROOMPTER_FLOWISE_DATABASE_USER,
        password: process.env.PROOMPTER_FLOWISE_DATABASE_PASSWORD,
        database: process.env.PROOMPTER_FLOWISE_DATABASE_NAME,
        charset: "utf8mb4",
        synchronize: false,
        migrationsRun: false,
        entities: Object.values(entities),
        migrations: mysqlMigrations,
      });
      break;
    case "postgres":
      appDataSource = new DataSource({
        type: "postgres",
        url: process.env.PROOMPTER_FLOWISE_DATABASE_URL,
        synchronize: false,
        migrationsRun: false,
        entities: Object.values(entities),
        migrations: postgresMigrations,
      });
      break;
    default:
      homePath =
        process.env.PROOMPTER_FLOWISE_DATABASE_PATH ??
        path.join(getUserHome(), ".flowise");
      appDataSource = new DataSource({
        type: "sqlite",
        database: path.resolve(homePath, "database.sqlite"),
        synchronize: false,
        migrationsRun: false,
        entities: Object.values(entities),
        migrations: sqliteMigrations,
      });
      break;
  }
};

export function getDataSource(): typeorm.DataSource {
  if (appDataSource === undefined) {
    init();
  }
  return appDataSource;
}
