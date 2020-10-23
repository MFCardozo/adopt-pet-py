import "reflect-metadata";
import { createConnection } from "typeorm";
import typeConfig from "./type-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { AnimalResolver } from "./resolvers/animal";
import { UserResolver } from "./resolvers/user";
import session from "express-session";
import { __prod__ } from "./constants";
import Redis from "ioredis";
import cors from "cors";
import connectRedis from "connect-redis";
const main = async () => {
  const orm = await createConnection(typeConfig);

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: "http://localhost:3000",
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
        //domain: __prod__ ? ".codeponder.com" : undefined,
      },
      saveUninitialized: false,
      secret: "asmsakxaslxascascq",
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AnimalResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("server started on port 4000");
  });
};

main().catch((err) => {
  console.log(err);
});
