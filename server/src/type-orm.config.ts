import { Animal } from "./entities/Animal";
import { User } from "./entities/User";

export default {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "1234",
  database: "pets-test",
  synchronize: true,
  entities: [Animal, User],
  logging: false,
} as any;
