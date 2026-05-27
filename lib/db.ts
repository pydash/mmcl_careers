// Framework / runtime
import dotenv from "dotenv";

// External libraries
import { neon } from "@neondatabase/serverless";

// Load local environment for scripts (Next.js will load .env.local in dev)
dotenv.config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("Database URL missing");
}

export const sql = neon(databaseUrl);
