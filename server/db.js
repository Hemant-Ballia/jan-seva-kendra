import pg from "pg";

const { Pool } = pg;

const connectionString =
  process.env.DATABASE_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL_UNPOOLED;

if (!connectionString) {
  console.error(
    "[server] No DATABASE_URL found in environment. The API cannot connect to Neon."
  );
}

export const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

const defaultNotices = [
  {
    title: "Scholarship form help available",
    titleHi: "छात्रवृत्ति फॉर्म सहायता उपलब्ध",
    type: "Scholarship",
  },
  {
    title: "PAN card and certificate services available",
    titleHi: "पैन कार्ड और प्रमाण पत्र सेवाएं उपलब्ध",
    type: "Service",
  },
];

export const initDb = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      token_no TEXT NOT NULL,
      user_id UUID REFERENCES users(id) ON DELETE SET NULL,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      category TEXT,
      service TEXT NOT NULL,
      message TEXT,
      preferred_date DATE,
      status TEXT NOT NULL DEFAULT 'Pending',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS notices (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      title_hi TEXT NOT NULL,
      type TEXT NOT NULL DEFAULT 'Service',
      status TEXT NOT NULL DEFAULT 'Active',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS service_status (
      service_id TEXT PRIMARY KEY,
      active BOOLEAN NOT NULL DEFAULT true,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
    );
  `);

  // Seed default notices only when the table is empty.
  const { rows } = await pool.query("SELECT COUNT(*)::int AS count FROM notices");

  if (rows[0].count === 0) {
    for (const notice of defaultNotices) {
      await pool.query(
        `INSERT INTO notices (title, title_hi, type, status)
         VALUES ($1, $2, $3, 'Active')`,
        [notice.title, notice.titleHi, notice.type]
      );
    }
  }

  console.log("[server] Database schema is ready.");
};
