import { pool } from "./lib/db";

async function run() {
  const result = await pool.query("SELECT NOW()");
  console.log(result.rows);
}

async function getUsers() {
  const result = await pool.query("SELECT email FROM user_accounts");
  console.log(result.rows);
}

getUsers();
