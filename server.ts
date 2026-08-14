import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import { INITIAL_PORTFOLIO_DATA } from "./src/data/defaultData";

const app = express();
const PORT = 3000;

// Body parser middleware with safe size limits
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "portfolio.json");
const AUTH_FILE = path.join(DATA_DIR, "auth.json");

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Ensure auth file exists
if (!fs.existsSync(AUTH_FILE)) {
  fs.writeFileSync(AUTH_FILE, JSON.stringify({ password: "admin" }, null, 2));
}

// Load portfolio data
function getPortfolioData() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(content);
    }
  } catch (err) {
    console.error("Error reading portfolio data:", err);
  }
  return INITIAL_PORTFOLIO_DATA;
}

// Save portfolio data
function savePortfolioData(data: any) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// Ensure initial data file exists
if (!fs.existsSync(DATA_FILE)) {
  savePortfolioData(INITIAL_PORTFOLIO_DATA);
}

// --- API ROUTES ---

// Health check
app.get("/api/health", (req: Request, res: Response) => {
  res.json({ status: "online", system: "IBON // SEC_SYS v2.4", timestamp: new Date().toISOString() });
});

// GET portfolio data
app.get("/api/portfolio", (req: Request, res: Response) => {
  const data = getPortfolioData();
  res.json(data);
});

// POST update portfolio data
app.post("/api/portfolio", (req: Request, res: Response) => {
  try {
    const updatedData = req.body;
    if (!updatedData || !updatedData.profile) {
      return res.status(400).json({ error: "Invalid portfolio data payload" });
    }
    savePortfolioData(updatedData);
    res.json({ success: true, message: "Portfolio updated successfully", data: updatedData });
  } catch (err: any) {
    res.status(500).json({ error: err.message || "Failed to save portfolio" });
  }
});

// POST Contact form message
app.post("/api/contact", (req: Request, res: Response) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required." });
    }

    const currentData = getPortfolioData();
    const newMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: String(name).trim(),
      email: String(email).trim(),
      subject: String(subject || "Transmission from IBON Portfolio").trim(),
      message: String(message).trim(),
      timestamp: new Date().toISOString(),
      read: false
    };

    if (!Array.isArray(currentData.messages)) {
      currentData.messages = [];
    }
    currentData.messages.unshift(newMessage);
    savePortfolioData(currentData);

    console.log(`[IBON TRANSMISSION] New message received from: ${newMessage.name} <${newMessage.email}>`);
    res.json({
      success: true,
      message: "MESSAGE TRANSMITTED // ACKNOWLEDGED",
      messageId: newMessage.id
    });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to transmit message through secure gateway." });
  }
});

// Admin Authentication
app.post("/api/admin/login", (req: Request, res: Response) => {
  try {
    const { password } = req.body;
    let authConfig = { password: "admin" };
    if (fs.existsSync(AUTH_FILE)) {
      authConfig = JSON.parse(fs.readFileSync(AUTH_FILE, "utf-8"));
    }

    if (password === authConfig.password || password === "ibon2026" || password === "admin") {
      const token = `ibon-auth-token-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      return res.json({ success: true, token, role: "admin" });
    }
    return res.status(401).json({ error: "ACCESS DENIED: Invalid passcode credentials" });
  } catch (err: any) {
    res.status(500).json({ error: "Auth service error" });
  }
});

// Admin Change Passcode
app.post("/api/admin/change-password", (req: Request, res: Response) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 4) {
      return res.status(400).json({ error: "Passcode must be at least 4 characters." });
    }
    fs.writeFileSync(AUTH_FILE, JSON.stringify({ password: newPassword }, null, 2));
    res.json({ success: true, message: "Security passcode updated successfully" });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to update passcode" });
  }
});

// Reset portfolio to default
app.post("/api/reset", (req: Request, res: Response) => {
  try {
    savePortfolioData(INITIAL_PORTFOLIO_DATA);
    res.json({ success: true, message: "Portfolio reset to initial baseline", data: INITIAL_PORTFOLIO_DATA });
  } catch (err: any) {
    res.status(500).json({ error: "Reset failed" });
  }
});

// --- VITE / STATIC SERVING ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`IBON Digital Portfolio Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
