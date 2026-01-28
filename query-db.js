require('dotenv').config({ path: '.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

async function queryDatabase() {
  try {
    console.log('Connecting to database...');

    const users = await pool.query('SELECT id, email, role, created_at FROM user_accounts LIMIT 10');
    console.log('\n=== USER ACCOUNTS ===');
    console.table(users.rows);

    const jobs = await pool.query('SELECT id, title, department, employment_type, is_active FROM jobs LIMIT 10');
    console.log('\n=== JOBS ===');
    console.table(jobs.rows);

    const applications = await pool.query('SELECT * FROM applications LIMIT 10');
    console.log('\n=== APPLICATIONS ===');
    console.table(applications.rows);

    const tables = await pool.query(`
      SELECT tablename
      FROM pg_tables
      WHERE schemaname = 'public'
      ORDER BY tablename;
    `);
    console.log('\n=== ALL TABLES ===');
    console.table(tables.rows);

  } catch (error) {
    console.error('Database query error:', error);
  } finally {
    console.log('\nClosing database connection...');
    pool.end();
  }
}

queryDatabase();