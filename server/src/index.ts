require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import { graphqlUploadExpress } from "graphql-upload";
import Redis from "ioredis";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { __prod__ } from "./constants";
import { AnimalResolver } from "./resolvers/animalPosts";
import { UserResolver } from "./resolvers/user";
import typeConfig from "./type-orm.config";

const main = async () => {
  await createConnection(typeConfig);

  // await conn.runMigrations();

  const app = express();

  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  app.use(
    session({
      name: "pet",
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 5, // 5 years
        httpOnly: true,
        sameSite: "lax", // csrf
        secure: __prod__, // cookie only works in https
        domain: __prod__ ? ".petfinderpy.com" : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AnimalResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
    uploads: false,
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(parseInt(process.env.PORT), () => {
    console.log("server started on port 4000");
  });
};

main().catch((err) => {
  console.log(err);
});
