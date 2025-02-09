import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import { resolvers } from "./graphql/resolvers";
import typeDefs from "./graphql/schema/schema";
import { AppDataSource } from "./database/data-source";
import bodyParser from "body-parser";
import cors from "cors";

const PORT = process.env.SERVER_PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

(async () => {
  await AppDataSource.initialize();
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: CORS_ORIGIN,
    }),
    bodyParser.json(),
    expressMiddleware(server)
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: Number(PORT) }, resolve)
  );
  console.log(`Server ready at http://localhost:${PORT}/graphql`);
})();
