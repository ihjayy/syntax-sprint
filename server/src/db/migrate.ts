import fs from 'fs';
import path from 'path';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

async function ensureDatabaseExists() {
  // Connect to default 'postgres' system database first
  const defaultUrl = process.env.DATABASE_URL?.replace(/\/syntax_sprint(\?.*)?$/, '/postgres$1');
  const tempPool = new Pool({ connectionString: defaultUrl });
  
  try {
    const res = await tempPool.query("SELECT 1 FROM pg_database WHERE datname = 'syntax_sprint'");
    if (res.rowCount === 0) {
      console.log('Database "syntax_sprint" does not exist. Creating it...');
      await tempPool.query('CREATE DATABASE syntax_sprint');
      console.log('Database "syntax_sprint" created successfully.');
    }
  } catch (err) {
    console.error('Error checking/creating database:', err);
    throw err;
  } finally {
    await tempPool.end();
  }
}

async function runMigrations() {
  await ensureDatabaseExists();

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();

  try {
    console.log('Running database migrations...');
    
    const migration1 = fs.readFileSync(path.join(process.cwd(), 'src/db/migrations/001_initial_schema.sql'), 'utf-8');
    const migration2 = fs.readFileSync(path.join(process.cwd(), 'src/db/migrations/002_leaderboard_view.sql'), 'utf-8');
    const seed = fs.readFileSync(path.join(process.cwd(), 'src/db/seeds/001_snippets_seed.sql'), 'utf-8');

    await client.query(migration1);
    await client.query(migration2);
    await client.query(seed);

    console.log('Migrations and seeds executed successfully!');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigrations();