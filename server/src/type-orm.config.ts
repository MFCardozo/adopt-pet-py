import { Animal } from "./entities/AnimalPost";
import { User } from "./entities/User";
import "dotenv-safe/config";
import path from "path";
export default {
  type: "postgres",
  url: process.env.DATABASE_URL,
  // synchronize: true,
  migrations: [path.join(__dirname, "./migrations/*")],
  entities: [Animal, User],
  logging: false,
} as any;
