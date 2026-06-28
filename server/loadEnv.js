import dotenv from "dotenv";

// Load Vite's project env file so the API process (started outside Vite)
// has access to DATABASE_URL and other secrets. Imported first, before any
// module that reads process.env at load time (e.g. the pg pool in db.js).
dotenv.config({ path: ".env.development.local" });
