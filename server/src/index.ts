import dotenv from "dotenv";
dotenv.config();
import { ApolloServer } from "apollo-server-express";
import express from "express";
import cookieParser from "cookie-parser";
import { typeDefs, resolvers } from "./schema.js";
import path from "path";
import jwt from "jsonwebtoken";
import cors from "cors";

const sitePath = path.join(path.resolve(), "..", "client", "build");

const httpPort = 4000;
async function startServer() {
  const serverApollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
      const token = req.cookies.token;
      const user = token
        ? jwt.verify(
            token,
            process.env.secret || "this-is-a-fallback-secret-change-it"
          )
        : null;
      return { user, res };
    },
  });
  await serverApollo.start();
  const app = express();
  app.use(cookieParser());
  serverApollo.applyMiddleware({ app});
  app.use(express.static(path.join(sitePath)));
  app.get("/*", (req, res) => res.sendFile(path.join(sitePath, "index.html")));
  app.listen(httpPort);
}

startServer();
