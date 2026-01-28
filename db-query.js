require('dotenv').config({ path: '.env.local' });

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

async function queryDatabase() {
  try {
    
    const tables = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log('Tables in database:', tables.rows.map(row => row.table_name));
    
    //users
    const result = await pool.query('SELECT * FROM user_accounts LIMIT 10');
    console.log('Users:', result.rows);
    
    //jobs 
    const jobs = await pool.query('SELECT * FROM job_posts LIMIT 10');
    console.log('Jobs:', jobs.rows);
    
    // applications
    const apps = await pool.query('SELECT * FROM job_applications LIMIT 10');
    console.log('Applications:', apps.rows);
    
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    pool.end();
  }
}

queryDatabase();