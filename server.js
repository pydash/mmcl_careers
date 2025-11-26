const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const app = express();
const port = 3001;

app.use(cors());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "password",
  port: 5432,
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
