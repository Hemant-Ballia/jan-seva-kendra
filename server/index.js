// Must be first: loads env vars before db.js constructs the pg pool.
import "./loadEnv.js";

import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { pool, initDb } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.API_PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "jsk-dev-secret-change-me";
const ADMIN_SECRET_CODE = process.env.ADMIN_SECRET_CODE || "ISHI_ADMIN_2026";

/* ----------------------------- serializers ----------------------------- */

const serializeUser = (row) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  phone: row.phone,
  role: row.role,
  createdAt: row.created_at,
});

const serializeBooking = (row) => ({
  id: row.id,
  tokenNo: row.token_no,
  userId: row.user_id,
  name: row.name,
  phone: row.phone,
  category: row.category,
  service: row.service,
  message: row.message,
  date: row.preferred_date,
  status: row.status,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

const serializeNotice = (row) => ({
  id: row.id,
  title: row.title,
  titleHi: row.title_hi,
  type: row.type,
  status: row.status,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

/* ------------------------------ auth utils ------------------------------ */

const signToken = (user) =>
  jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });

const authenticate = (required = true) => async (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    if (required) return res.status(401).json({ message: "Authentication required." });
    return next();
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [payload.id]);

    if (!rows[0]) {
      if (required) return res.status(401).json({ message: "Invalid session." });
      return next();
    }

    req.user = serializeUser(rows[0]);
    next();
  } catch {
    if (required) return res.status(401).json({ message: "Invalid or expired session." });
    next();
  }
};

const requireAdmin = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res.status(403).json({ message: "Admin access required." });
  }
  next();
};

const clean = (value) => (typeof value === "string" ? value.trim() : "");

/* --------------------------------- auth --------------------------------- */

app.post("/api/auth/register", async (req, res) => {
  try {
    const name = clean(req.body.name);
    const email = clean(req.body.email).toLowerCase();
    const phone = clean(req.body.phone);
    const password = clean(req.body.password);
    const role = req.body.role === "admin" ? "admin" : "user";
    const adminCode = clean(req.body.adminCode);

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "Please fill all required fields." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }

    if (role === "admin" && adminCode !== ADMIN_SECRET_CODE) {
      return res.status(400).json({ message: "Invalid admin secret code." });
    }

    const existing = await pool.query("SELECT id FROM users WHERE email = $1", [email]);
    if (existing.rows[0]) {
      return res.status(409).json({ message: "Account already exists with this email." });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const { rows } = await pool.query(
      `INSERT INTO users (name, email, phone, password_hash, role)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, email, phone, passwordHash, role]
    );

    const user = serializeUser(rows[0]);
    res.status(201).json({ user, token: signToken(user) });
  } catch (error) {
    console.error("[server] register error:", error.message);
    res.status(500).json({ message: "Could not create account. Please try again." });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const email = clean(req.body.email).toLowerCase();
    const password = clean(req.body.password);
    const role = req.body.role === "admin" ? "admin" : "user";

    if (!email || !password) {
      return res.status(400).json({ message: "Please enter email and password." });
    }

    const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const found = rows[0];

    if (!found || found.role !== role) {
      return res.status(401).json({ message: "Invalid email, password or role." });
    }

    const matches = await bcrypt.compare(password, found.password_hash);
    if (!matches) {
      return res.status(401).json({ message: "Invalid email, password or role." });
    }

    const user = serializeUser(found);
    res.json({ user, token: signToken(user) });
  } catch (error) {
    console.error("[server] login error:", error.message);
    res.status(500).json({ message: "Could not log in. Please try again." });
  }
});

app.get("/api/auth/me", authenticate(true), (req, res) => {
  res.json({ user: req.user });
});

/* ------------------------------- bookings ------------------------------- */

app.post("/api/bookings", authenticate(false), async (req, res) => {
  try {
    const name = clean(req.body.name);
    const phone = clean(req.body.mobile || req.body.phone);
    const category = clean(req.body.category);
    const service = clean(req.body.service);
    const message = clean(req.body.message);
    const date = req.body.date || null;

    const mobileRegex = /^[6-9]\d{9}$/;

    if (!name) return res.status(400).json({ message: "Please enter applicant name." });
    if (!mobileRegex.test(phone)) {
      return res.status(400).json({ message: "Please enter a valid 10 digit mobile number." });
    }
    if (!service) return res.status(400).json({ message: "Please select a service." });

    const tokenNo = `TKN-${Math.floor(1000 + Math.random() * 9000)}`;

    const { rows } = await pool.query(
      `INSERT INTO bookings (token_no, user_id, name, phone, category, service, message, preferred_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [tokenNo, req.user?.id || null, name, phone, category, service, message, date]
    );

    res.status(201).json({ booking: serializeBooking(rows[0]) });
  } catch (error) {
    console.error("[server] create booking error:", error.message);
    res.status(500).json({ message: "Could not register token. Please try again." });
  }
});

// Admin: all bookings.
app.get("/api/bookings", authenticate(true), requireAdmin, async (_req, res) => {
  const { rows } = await pool.query("SELECT * FROM bookings ORDER BY created_at DESC");
  res.json({ bookings: rows.map(serializeBooking) });
});

// User: bookings tied to their account.
app.get("/api/bookings/mine", authenticate(true), async (req, res) => {
  const { rows } = await pool.query(
    "SELECT * FROM bookings WHERE user_id = $1 ORDER BY created_at DESC",
    [req.user.id]
  );
  res.json({ bookings: rows.map(serializeBooking) });
});

app.patch("/api/bookings/:id", authenticate(true), requireAdmin, async (req, res) => {
  const allowed = ["Pending", "Processing", "Completed", "Cancelled"];
  const status = req.body.status;

  if (!allowed.includes(status)) {
    return res.status(400).json({ message: "Invalid status value." });
  }

  const { rows } = await pool.query(
    `UPDATE bookings SET status = $1, updated_at = now() WHERE id = $2 RETURNING *`,
    [status, req.params.id]
  );

  if (!rows[0]) return res.status(404).json({ message: "Booking not found." });
  res.json({ booking: serializeBooking(rows[0]) });
});

/* -------------------------------- notices ------------------------------- */

// Public: active notices only.
app.get("/api/notices/active", async (_req, res) => {
  const { rows } = await pool.query(
    "SELECT * FROM notices WHERE status = 'Active' ORDER BY created_at DESC"
  );
  res.json({ notices: rows.map(serializeNotice) });
});

// Admin: all notices.
app.get("/api/notices", authenticate(true), requireAdmin, async (_req, res) => {
  const { rows } = await pool.query("SELECT * FROM notices ORDER BY created_at DESC");
  res.json({ notices: rows.map(serializeNotice) });
});

app.post("/api/notices", authenticate(true), requireAdmin, async (req, res) => {
  const title = clean(req.body.title);
  const titleHi = clean(req.body.titleHi);
  const type = clean(req.body.type) || "Service";
  const status = req.body.status === "Inactive" ? "Inactive" : "Active";

  if (!title || !titleHi) {
    return res.status(400).json({ message: "Please fill both English and Hindi titles." });
  }

  const { rows } = await pool.query(
    `INSERT INTO notices (title, title_hi, type, status)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [title, titleHi, type, status]
  );

  res.status(201).json({ notice: serializeNotice(rows[0]) });
});

app.patch("/api/notices/:id", authenticate(true), requireAdmin, async (req, res) => {
  const fields = [];
  const values = [];
  let i = 1;

  if (req.body.title !== undefined) {
    fields.push(`title = $${i++}`);
    values.push(clean(req.body.title));
  }
  if (req.body.titleHi !== undefined) {
    fields.push(`title_hi = $${i++}`);
    values.push(clean(req.body.titleHi));
  }
  if (req.body.type !== undefined) {
    fields.push(`type = $${i++}`);
    values.push(clean(req.body.type));
  }
  if (req.body.status !== undefined) {
    fields.push(`status = $${i++}`);
    values.push(req.body.status === "Inactive" ? "Inactive" : "Active");
  }

  if (fields.length === 0) {
    return res.status(400).json({ message: "Nothing to update." });
  }

  values.push(req.params.id);

  const { rows } = await pool.query(
    `UPDATE notices SET ${fields.join(", ")}, updated_at = now()
     WHERE id = $${i} RETURNING *`,
    values
  );

  if (!rows[0]) return res.status(404).json({ message: "Notice not found." });
  res.json({ notice: serializeNotice(rows[0]) });
});

app.delete("/api/notices/:id", authenticate(true), requireAdmin, async (req, res) => {
  const { rowCount } = await pool.query("DELETE FROM notices WHERE id = $1", [req.params.id]);
  if (rowCount === 0) return res.status(404).json({ message: "Notice not found." });
  res.json({ success: true });
});

/* ---------------------------- service status ---------------------------- */

// Public: map of serviceId -> active (false means hidden/inactive).
app.get("/api/services/status", async (_req, res) => {
  const { rows } = await pool.query("SELECT service_id, active FROM service_status");
  const statusMap = {};
  for (const row of rows) statusMap[row.service_id] = row.active;
  res.json({ status: statusMap });
});

app.patch("/api/services/status/:id", authenticate(true), requireAdmin, async (req, res) => {
  const active = Boolean(req.body.active);

  await pool.query(
    `INSERT INTO service_status (service_id, active, updated_at)
     VALUES ($1, $2, now())
     ON CONFLICT (service_id)
     DO UPDATE SET active = EXCLUDED.active, updated_at = now()`,
    [req.params.id, active]
  );

  res.json({ serviceId: req.params.id, active });
});

/* -------------------------------- startup ------------------------------- */

app.get("/api/health", (_req, res) => res.json({ ok: true }));

initDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[server] Jan Seva Kendra API running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("[server] Failed to initialize database:", error.message);
    process.exit(1);
  });
