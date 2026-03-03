import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import multer from "multer";
import Database from "better-sqlite3";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const db = new Database("database.sqlite");

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    filename TEXT NOT NULL,
    section TEXT NOT NULL,
    title TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS experience (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT,
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS skills (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT
  );
`);

// Migration: Add title column if it doesn't exist (for existing databases)
try {
  db.exec("ALTER TABLE images ADD COLUMN title TEXT");
} catch (e) {
  // Column already exists, ignore error
}

// Seed/Update initial settings
const initialSettings = [
  { key: "email", value: "wasey351@gmail.com" },
  { key: "phone1", value: "+92 (341) 1236082" },
  { key: "phone2", value: "+92 (310) 2454778" },
  { key: "linkedin", value: "https://www.linkedin.com/in/heiswasay/" },
  { key: "facebook", value: "" },
  { key: "instagram", value: "" },
  { key: "whatsapp", value: "" },
  { key: "about_text", value: "I am a results-driven marketing professional with expertise in brand strategy, digital growth, and multi-industry management. With over 5 years of experience, I've specialized in building scalable brands across tech, skincare, hospitality, and services through data-driven marketing solutions." },
  { key: "about_image", value: "profile.png" }
];
const upsertSetting = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
initialSettings.forEach(s => upsertSetting.run(s.key, s.value));

// Seed initial skills data if empty
const skillCount = db.prepare("SELECT COUNT(*) as count FROM skills").get() as { count: number };
if (skillCount.count === 0) {
  const initialSkills = [
    "Brand Management", 
    "Marketing Management", 
    "Content Development", 
    "Marketing Strategist", 
    "Digital Growth", 
    "Marketing Planning & Execution"
  ];
  const insertSkill = db.prepare("INSERT INTO skills (name) VALUES (?)");
  initialSkills.forEach(skill => insertSkill.run(skill));
}

// Seed initial experience data if empty
const experienceCount = db.prepare("SELECT COUNT(*) as count FROM experience").get() as { count: number };
if (experienceCount.count === 0) {
  const initialExperiences = [
    {
      role: "DIGITAL MARKETING MANAGER",
      company: "Servionsoft IT Solution",
      period: "2022 – PRESENT",
      description: "As a Digital Marketing Manager at Servionsoft IT Solution, I lead and execute end-to-end marketing strategies across six diverse companies operating in the UK and Pakistan. My role focuses on brand growth, demand generation, digital performance, and cross-industry positioning.",
      details: "Key Responsibilities & Achievements:\n• Develop and manage integrated marketing strategies aligned with business objectives across multiple industries.\n• Oversee digital marketing, branding, performance campaigns, content strategy, and lead generation.\n• Coordinate with cross-functional teams including design, development, sales, and operations.\n• Analyze performance metrics to optimize campaigns, improve ROI, and drive sustainable growth.\n• Build and scale brand presence across digital platforms while maintaining consistent brand identity.\n\nCompanies Managed:\n• GuardianFM (UK) – Security services provider, managing brand positioning, lead generation, and B2B marketing campaigns.\n• Xtreme Professional Cleaning Ltd (UK) – Cleaning and maintenance company, leading local SEO, paid ads, and service-based marketing strategies.\n• Servionsoft IT Solution (USA, UK & Pakistan) – IT solutions company, handling corporate branding, B2B marketing, and digital outreach.\n• Ceres Derma UK (UK) – Skincare brand, overseeing product marketing, eCommerce strategy, performance ads, and brand development from scratch.\n• Arabian Grill Restaurant (Pakistan) – Restaurant brand, managing social media marketing, promotions, and customer engagement.\n• NextChat – AI-powered chat and application platform, leading product marketing, launch strategy, and user acquisition initiatives."
    },
    {
      role: "CREATIVE TEAM LEAD",
      company: "Darwaish Marketing Pvt. Ltd.",
      period: "2021 – 2022",
      description: "Served as Creative Team Lead, managing and mentoring a multidisciplinary creative team while actively contributing as a videographer and photographer. Led end-to-end content production, from concept development and visual storytelling to on-site shoots and post-production. Collaborated closely with marketing and strategy teams to deliver high-impact visual content aligned with brand objectives, ensuring consistency, creativity, and timely execution across digital platforms.",
      details: ""
    }
  ];

  const insertExp = db.prepare("INSERT INTO experience (role, company, period, description, details) VALUES (?, ?, ?, ?, ?)");
  initialExperiences.forEach(exp => {
    insertExp.run(exp.role, exp.company, exp.period, exp.description, exp.details);
  });
}

// Seed/Update initial images
const initialImages = [
  { filename: "agnleads.PNG", section: "achievements", title: "Orders Generation For Restaurant" },
  { filename: "bzleads.PNG", section: "achievements", title: "Leads Generation For Real Estate" },
  { filename: "ceressales.png", section: "achievements", title: "Sales For SkinCare Brands" },
  { filename: "xpcleads.png", section: "achievements", title: "Leads Generation For Cleaning Company" },
  { filename: "ceresgoogle.png", section: "achievements", title: "SkinCare Brand Traffic" },
  { filename: "ncgoogle.png", section: "achievements", title: "Application Installs" },
  { filename: "gfm.png", section: "content", title: "Security Company Instagram" },
  { filename: "gfm1.jpg", section: "content", title: "Post" },
  { filename: "gfm2.jpg", section: "content", title: "Post" },
  { filename: "gfm3.jpg", section: "content", title: "Post" },
  { filename: "agn.png", section: "content", title: "Restaurant Instagram" },
  { filename: "agn1.jpg", section: "content", title: "Post" },
  { filename: "agn2.jpg", section: "content", title: "Post" },
  { filename: "agn3.jpg", section: "content", title: "Post" },
  { filename: "nextchat.png", section: "content", title: "Application Instagram" },
  { filename: "nextchat1.jpg", section: "content", title: "Post" },
  { filename: "nextchat2.jpg", section: "content", title: "Post" },
  { filename: "nextchat3.jpg", section: "content", title: "Post" },
  { filename: "ss.png", section: "content", title: "IT Solution Company Instagram" },
  { filename: "ss1.jpg", section: "content", title: "Post" },
  { filename: "ss2.jpg", section: "content", title: "Post" },
  { filename: "ss3.jpg", section: "content", title: "Post" },
  { filename: "hero.jpg", section: "hero", title: "Main Hero" }
];
const insertImg = db.prepare("INSERT INTO images (filename, section, title) VALUES (?, ?, ?)");
const updateImg = db.prepare("UPDATE images SET title = ? WHERE filename = ?");

initialImages.forEach(img => {
  const existing = db.prepare("SELECT id FROM images WHERE filename = ?").get(img.filename);
  if (existing) {
    updateImg.run(img.title, img.filename);
  } else {
    insertImg.run(img.filename, img.section, img.title);
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Multer configuration
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dir = path.join(__dirname, "public", "images");
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      cb(null, dir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });

  const upload = multer({ storage });

  // API Routes
  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    if (username === "heiswasay" && password === "marketer") {
      res.json({ success: true, token: "fake-jwt-token" });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  // Image Routes
  app.get("/api/images", (req, res) => {
    const images = db.prepare("SELECT * FROM images ORDER BY created_at DESC").all();
    res.json(images);
  });

  app.post("/api/upload", upload.single("image"), (req, res) => {
    const { section, title } = req.body;
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const stmt = db.prepare("INSERT INTO images (filename, section, title) VALUES (?, ?, ?)");
    const info = stmt.run(req.file.filename, section, title || null);

    res.json({ id: info.lastInsertRowid, filename: req.file.filename, section, title });
  });

  app.put("/api/images/:id", (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    console.log(`Updating title for image ${id}: ${title}`);
    
    try {
      db.prepare("UPDATE images SET title = ? WHERE id = ?").run(title, Number(id));
      res.json({ success: true });
    } catch (err) {
      console.error("Update failed:", err);
      res.status(500).json({ error: "Update failed" });
    }
  });

  app.delete("/api/images/:id", (req, res) => {
    const { id } = req.params;
    console.log(`Deleting image ${id}`);
    
    try {
      const image = db.prepare("SELECT filename FROM images WHERE id = ?").get(Number(id)) as { filename: string } | undefined;
      
      if (image) {
        const filePath = path.join(__dirname, "public", "images", image.filename);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        db.prepare("DELETE FROM images WHERE id = ?").run(Number(id));
        res.json({ success: true });
      } else {
        console.warn(`Image ${id} not found`);
        res.status(404).json({ error: "Image not found" });
      }
    } catch (err) {
      console.error("Delete failed:", err);
      res.status(500).json({ error: "Delete failed" });
    }
  });

  // Experience Routes
  app.get("/api/experience", (req, res) => {
    const experiences = db.prepare("SELECT * FROM experience ORDER BY created_at DESC").all();
    res.json(experiences);
  });

  app.post("/api/experience", (req, res) => {
    const { role, company, period, description, details } = req.body;
    const stmt = db.prepare("INSERT INTO experience (role, company, period, description, details) VALUES (?, ?, ?, ?, ?)");
    const info = stmt.run(role, company, period, description, details);
    res.json({ id: info.lastInsertRowid, role, company, period, description, details });
  });

  app.put("/api/experience/:id", (req, res) => {
    const { id } = req.params;
    const { role, company, period, description, details } = req.body;
    db.prepare("UPDATE experience SET role = ?, company = ?, period = ?, description = ?, details = ? WHERE id = ?")
      .run(role, company, period, description, details, Number(id));
    res.json({ success: true });
  });

  app.delete("/api/experience/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM experience WHERE id = ?").run(Number(id));
    res.json({ success: true });
  });

  // Skill Routes
  app.get("/api/skills", (req, res) => {
    const skills = db.prepare("SELECT * FROM skills ORDER BY name ASC").all();
    res.json(skills);
  });

  app.post("/api/skills", (req, res) => {
    const { name } = req.body;
    try {
      const stmt = db.prepare("INSERT INTO skills (name) VALUES (?)");
      const info = stmt.run(name);
      res.json({ id: info.lastInsertRowid, name });
    } catch (err) {
      res.status(400).json({ error: "Skill already exists or invalid" });
    }
  });

  app.delete("/api/skills/:id", (req, res) => {
    const { id } = req.params;
    db.prepare("DELETE FROM skills WHERE id = ?").run(Number(id));
    res.json({ success: true });
  });

  // Settings Routes
  app.get("/api/settings", (req, res) => {
    const settings = db.prepare("SELECT * FROM settings").all();
    const settingsObj = (settings as any[]).reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(settingsObj);
  });

  app.post("/api/settings", (req, res) => {
    const settings = req.body;
    const upsert = db.prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
    
    db.transaction(() => {
      for (const [key, value] of Object.entries(settings)) {
        upsert.run(key, value as string);
      }
    })();
    
    res.json({ success: true });
  });

  // Explicitly serve the public/images directory
  app.use("/images", express.static(path.resolve("public/images")));

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
