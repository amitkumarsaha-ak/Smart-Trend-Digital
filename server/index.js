import express from "express";
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 5050;
const dataDir = path.join(__dirname, "data");
const inquiriesFile = path.join(dataDir, "inquiries.json");
const quotationsFile = path.join(dataDir, "quotations.json");

app.use(cors());
app.use(express.json());

const company = {
  name: "Smart Trend Digital",
  shortName: "STD",
  tagline: "Digital Innovation, Creative Excellence & Smart Facility Solutions",
  founder: "Moon M. Rajib",
  title: "Founder & CEO",
  phone: "+880 18545-55530",
  whatsapp: "+880 18545-55530",
  email: "std.com.bd@gmail.com",
  website: "www.std.com.bd",
  address: "Simpletree Attalika (Level 19), 134 Gulshan Avenue, Dhaka 1212, Bangladesh",
  memberships: ["BASIS", "BIIN"]
};

// Health Check
app.get("/api/health", (_req, res) => {
  res.json({ ok: true, status: "healthy", company: company.shortName });
});

// Company Info
app.get("/api/company", (_req, res) => {
  res.json(company);
});

// General Inquiries
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, service, message, type, scope, deadline, estimatedRange, currency } = req.body || {};

  if (!name?.trim() || !email?.trim()) {
    return res.status(400).json({
      ok: false,
      error: "Please provide your name and email address.",
    });
  }

  const record = {
    id: Date.now().toString(36),
    name: String(name).trim(),
    email: String(email).trim(),
    phone: phone ? String(phone).trim() : "",
    service: service ? String(service).trim() : "",
    scope: scope || "",
    deadline: deadline || "",
    estimatedRange: estimatedRange || "",
    currency: currency || "",
    message: message ? String(message).trim() : "",
    type: type || "general_inquiry",
    receivedAt: new Date().toISOString(),
  };

  try {
    await fs.mkdir(dataDir, { recursive: true });
    
    // If it is a quotation request, save to quotations.json too
    if (type === "quotation_request") {
      let existingQuotes = [];
      try {
        const rawQ = await fs.readFile(quotationsFile, "utf8");
        existingQuotes = JSON.parse(rawQ);
        if (!Array.isArray(existingQuotes)) existingQuotes = [];
      } catch {
        existingQuotes = [];
      }
      existingQuotes.push(record);
      await fs.writeFile(quotationsFile, JSON.stringify(existingQuotes, null, 2));
    }

    let existingInquiries = [];
    try {
      const raw = await fs.readFile(inquiriesFile, "utf8");
      existingInquiries = JSON.parse(raw);
      if (!Array.isArray(existingInquiries)) existingInquiries = [];
    } catch {
      existingInquiries = [];
    }
    existingInquiries.push(record);
    await fs.writeFile(inquiriesFile, JSON.stringify(existingInquiries, null, 2));

    res.json({
      ok: true,
      referenceId: record.id.toUpperCase(),
      message: "Thank you! Our director team at Simpletree Attalika will review your request and follow up shortly.",
    });
  } catch (err) {
    console.error("Error saving inquiry:", err);
    res.status(500).json({
      ok: false,
      error: "Could not save request. Please reach out via WhatsApp at +880 18545-55530.",
    });
  }
});

// Serve frontend static build
const clientDist = path.join(__dirname, "../client/dist");
app.use(express.static(clientDist));

app.get("*", async (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  try {
    await fs.access(path.join(clientDist, "index.html"));
    res.sendFile(path.join(clientDist, "index.html"));
  } catch {
    res.status(200).json({
      ok: true,
      hint: "STD Server online. Client dist not yet built or running in Vite dev mode.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`STD API Server listening on http://localhost:${PORT}`);
});
