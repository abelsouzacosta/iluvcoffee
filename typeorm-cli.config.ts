import { CreateCoffeeTableMigration1662005837538 } from './src/common/infra/typeorm/migrations/1662005837538-CreateCoffeeTableMigration';
import { DataSource } from 'typeorm';
import 'dotenv/config';

export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.DATABASE_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrations: [CreateCoffeeTableMigration1662005837538],
});
