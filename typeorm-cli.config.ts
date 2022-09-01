import { DataSource } from 'typeorm';
import 'dotenv/config';
import {
  CreateFlavorsMigrationTable1662008561676,
  CreateCoffeeTableMigration1662005837538,
} from './src/common/infra/typeorm/migrations';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.DATABASE_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrations: [
    CreateCoffeeTableMigration1662005837538,
    CreateFlavorsMigrationTable1662008561676,
  ],
});
