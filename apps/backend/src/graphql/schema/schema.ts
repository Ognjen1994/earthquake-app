import { readFileSync } from "fs";
import path from "path";

const typeDefs = readFileSync(path.join(__dirname, "schema.graphql"), "utf8");

export default typeDefs;
