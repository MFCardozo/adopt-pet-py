"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Animal_1 = require("./entities/Animal");
const User_1 = require("./entities/User");
exports.default = {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "pets-test",
    synchronize: true,
    entities: [Animal_1.Animal, User_1.User],
    logging: false,
};
//# sourceMappingURL=type-orm.config.js.map