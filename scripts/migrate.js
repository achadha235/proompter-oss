// Migrate from a sqlite database to a postgres database using typeorm

const DataSource = require("typeorm").DataSource;
const flowise = require("flowise/dist/utils");
const entities = flowise.databaseEntities;
const path = require("path");

const { sqliteMigrations } = require("flowise/dist/database/migrations/sqlite");
const {
  postgresMigrations,
} = require("flowise/dist/database/migrations/postgres");

const sourceDataPath = "/Users/abhishekchadha/Desktop/.flowise/database.sqlite";
const targetUrl = process.env.TARGET_DB_URL;

async function migrate() {
  const sourceDataSource = new DataSource({
    type: "sqlite",
    database: path.resolve(sourceDataPath),
    synchronize: false,
    migrationsRun: false,
    entities: Object.values(entities),
    migrations: sqliteMigrations,
  });
  await sourceDataSource.initialize();

  const targetDataSource = new DataSource({
    type: "postgres",
    url: targetUrl,
    synchronize: false,
    migrationsRun: false,
    entities: Object.values(entities),
    migrations: postgresMigrations,
  });

  await targetDataSource.initialize();
  await targetDataSource.dropDatabase();
  await targetDataSource.runMigrations();
  for (const entity in entities) {
    const items = await sourceDataSource.getRepository(entity).find();
    await targetDataSource.getRepository(entity).save(items);
  }
  await targetDataSource.destroy();
  await sourceDataSource.destroy();
}

migrate()
  .then(() => {
    console.log("Done!");
  })
  .catch((error) => {
    console.error(error);
  });
