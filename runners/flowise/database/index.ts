import { entities } from "flowise/dist/database/entities";
import { mysqlMigrations } from "flowise/dist/database/migrations/mysql";
import { postgresMigrations } from "flowise/dist/database/migrations/postgres";
import { sqliteMigrations } from "flowise/dist/database/migrations/sqlite";
import { getUserHome } from "flowise/dist/utils";
import path from "path";
import { DataSource } from "typeorm";

let appDataSource: DataSource;

export const init = async (): Promise<void> => {
  let homePath;
  switch (process.env.DATABASE_TYPE) {
    case "sqlite":
      homePath =
        process.env.DATABASE_PATH ?? path.join(getUserHome(), ".flowise");
      appDataSource = new DataSource({
        type: "sqlite",
        database: path.resolve(homePath, "database.sqlite"),
        synchronize: false,
        migrationsRun: false,
        entities: entities,
        migrations: sqliteMigrations,
      });
      break;
    case "mysql":
      appDataSource = new DataSource({
        type: "mysql",
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT || "3306"),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        charset: "utf8mb4",
        synchronize: false,
        migrationsRun: false,
        entities: entities,
        migrations: mysqlMigrations,
      });
      break;
    case "postgres":
      appDataSource = new DataSource({
        type: "postgres",
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT || "5432"),
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        synchronize: false,
        migrationsRun: false,
        entities: entities,
        migrations: postgresMigrations,
      });
      break;
    default:
      homePath =
        process.env.DATABASE_PATH ?? path.join(getUserHome(), ".flowise");
      appDataSource = new DataSource({
        type: "sqlite",
        database: path.resolve(homePath, "database.sqlite"),
        synchronize: false,
        migrationsRun: false,
        entities: entities,
        migrations: sqliteMigrations,
      });
      break;
  }
};

export function getDataSource(): DataSource {
  if (appDataSource === undefined) {
    init();
  }
  return appDataSource;
}
