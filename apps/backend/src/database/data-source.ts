import { DataSource } from "typeorm";
import { Earthquake } from "./entities/Earthquake";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "3306"),
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "12345678",
  database: process.env.DB_NAME || "earthquakes",
  synchronize: true,
  entities: [Earthquake],
  migrations: ["src/migrations/*.ts"],
  charset: "utf8mb4",
});
