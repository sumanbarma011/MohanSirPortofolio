import dotenv from "dotenv";
import path from "path";

const env = process.env.NODE_ENV?.trim() || "development";
console.log(env);
dotenv.config({
  path: path.resolve(process.cwd(), `.env`),
});
console.log(process.env.MONGO_URI);
export const ENV = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI || "",
  NODE_ENV: env,

  JWT_SECRET: process.env.JWT_SECRET || process.env.JWT_SECRET_KEY || "",
};
