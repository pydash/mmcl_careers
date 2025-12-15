import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Create a PostgreSQL pool
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
});

// Optional: test connection immediately
pool
  .connect()
  .then((client) => {
    console.log("PostgreSQL connected successfully");
    client.release();
  })
  .catch((err) => {
    console.error("PostgreSQL connection error:", err);
  });
