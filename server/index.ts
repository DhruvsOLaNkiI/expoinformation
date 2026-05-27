import express from "express";
import dotenv from "dotenv";
import { closeDb, getDb, isMongoConfigured } from "./db.js";

dotenv.config();

const PORT = Number(process.env.API_PORT) || 3001;

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }
  next();
});

app.use(express.json({ limit: "1mb" }));

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function insertSubmission(collectionName: string, document: Record<string, unknown>) {
  const database = await getDb();
  const result = await database.collection(collectionName).insertOne({
    ...document,
    submittedAt: new Date(),
  });
  return result.insertedId;
}

app.get("/api/health", async (_req, res) => {
  try {
    if (!isMongoConfigured()) {
      res.json({ ok: true, mongo: false, message: "MONGODB_URI not configured" });
      return;
    }
    const database = await getDb();
    await database.command({ ping: 1 });
    res.json({ ok: true, mongo: true, database: database.databaseName });
  } catch (err) {
    res.status(503).json({
      ok: false,
      mongo: false,
      error: err instanceof Error ? err.message : "MongoDB connection failed",
    });
  }
});

app.post("/api/register", async (req, res) => {
  if (!isMongoConfigured()) {
    res.status(503).json({ error: "Database not configured. Set MONGODB_URI in .env" });
    return;
  }

  try {
    const { fullName, email, phone, city, interestType, message } = req.body ?? {};

    if (!fullName?.trim() || !email?.trim() || !phone?.trim()) {
      res.status(400).json({ error: "Name, email, and phone are required." });
      return;
    }
    if (!isValidEmail(String(email))) {
      res.status(400).json({ error: "Please enter a valid email address." });
      return;
    }

    const document = {
      type: "visitor",
      fullName: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      city: city ? String(city).trim() : "",
      interestType: interestType ? String(interestType) : "Home Buyer",
      message: message ? String(message).trim() : "",
    };

    const id = await insertSubmission("visitor_registrations", document);

    res.status(201).json({
      success: true,
      message: "Registration saved successfully.",
      id: String(id),
    });
  } catch (err) {
    console.error("POST /api/register:", err);
    res.status(500).json({ error: "Could not save registration. Please try again." });
  }
});

app.post("/api/exhibitor", async (req, res) => {
  if (!isMongoConfigured()) {
    res.status(503).json({ error: "Database not configured. Set MONGODB_URI in .env" });
    return;
  }

  try {
    const {
      companyName,
      contactName,
      email,
      phone,
      companyType,
      website,
      projectsCount,
      boothPreference,
      message,
    } = req.body ?? {};

    if (!companyName?.trim() || !contactName?.trim() || !email?.trim() || !phone?.trim()) {
      res.status(400).json({ error: "Company name, contact name, email, and phone are required." });
      return;
    }
    if (!isValidEmail(String(email))) {
      res.status(400).json({ error: "Please enter a valid email address." });
      return;
    }

    const document = {
      type: "exhibitor",
      companyName: String(companyName).trim(),
      contactName: String(contactName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      companyType: companyType ? String(companyType) : "Developer",
      website: website ? String(website).trim() : "",
      projectsCount: projectsCount ? String(projectsCount) : "",
      boothPreference: boothPreference ? String(boothPreference) : "",
      message: message ? String(message).trim() : "",
    };

    const id = await insertSubmission("exhibitor_applications", document);

    res.status(201).json({
      success: true,
      message: "Exhibitor application saved successfully.",
      id: String(id),
    });
  } catch (err) {
    console.error("POST /api/exhibitor:", err);
    res.status(500).json({ error: "Could not save application. Please try again." });
  }
});

const server = app.listen(PORT, () => {
  const mongoStatus = isMongoConfigured() ? "MongoDB enabled" : "MongoDB not configured (set MONGODB_URI)";
  console.log(`DB Expo API running on http://localhost:${PORT} — ${mongoStatus}`);
});

process.on("SIGINT", async () => {
  await closeDb();
  server.close(() => process.exit(0));
});

process.on("SIGTERM", async () => {
  await closeDb();
  server.close(() => process.exit(0));
});
