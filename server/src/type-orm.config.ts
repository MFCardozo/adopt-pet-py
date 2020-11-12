import path from "path";
require("dotenv").config({ path: __dirname + "../" });
import { Animal } from "./entities/AnimalPost";
import { User } from "./entities/User";

export default {
  type: "postgres",
  url: process.env.DATABASE_URL,
  //synchronize: true,
  migrations: [path.join(__dirname, "./migrations/*")],
  entities: [Animal, User],
  logging: false,
} as any;
