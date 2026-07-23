import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const { Pool } = pg;
const dbUrl = (process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5433/custom_websites_db')
  .replace('postgresql+psycopg2://', 'postgresql://');

const pool = new Pool({ connectionString: dbUrl });

async function main() {
  try {
    const slots = await pool.query("SELECT * FROM slots ORDER BY date DESC, time DESC");
    console.log("All Slots in DB:", slots.rows);

    const bookings = await pool.query("SELECT * FROM bookings ORDER BY date DESC, time DESC");
    console.log("All Bookings in DB:", bookings.rows);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

main();
