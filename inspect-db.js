import { config } from 'dotenv';
import { Pool } from "pg";

config({ path: '.env.local' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

async function inspectDatabase() {
  try {
    console.log("=== DATABASE TABLES ===");

    const tablesResult = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    for (const table of tablesResult.rows) {
      console.log(`\n--- Table: ${table.table_name} ---`);

      const columnsResult = await pool.query(`
        SELECT column_name, data_type, is_nullable, column_default
        FROM information_schema.columns
        WHERE table_name = $1 AND table_schema = 'public'
        ORDER BY ordinal_position;
      `, [table.table_name]);

      columnsResult.rows.forEach(col => {
        console.log(`  ${col.column_name}: ${col.data_type}${col.is_nullable === 'NO' ? ' (NOT NULL)' : ''}${col.column_default ? ` DEFAULT ${col.column_default}` : ''}`);
      });
    }

    console.log("\n=== DONE ===");
  } catch (error) {
    console.error("Error inspecting database:", error);
  } finally {
    await pool.end();
  }
}

inspectDatabase();