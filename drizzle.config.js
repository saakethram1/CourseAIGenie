/** @type {import("drizzle-kit").Config} */

import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/Schema1.jsx",
  out: "./drizzle",
  dbCredentials:{
    url:process.env.DATABASE_URL
  }
});
