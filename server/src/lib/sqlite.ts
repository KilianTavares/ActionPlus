import { DatabaseSync } from "node:sqlite";
import path from "path";
import fs from "fs";

// Ensure data directory exists
const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "database.sqlite");

// Initialize database connection
export const db = new DatabaseSync(dbPath);

// Initialize database schema
export function initializeDatabase() {
  // Create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      userID TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password TEXT NOT NULL,
      preferences TEXT DEFAULT '{}',
      settings TEXT DEFAULT '{}',
      privacy TEXT DEFAULT '{}',
      createdAt TEXT NOT NULL,
      lastUpdated TEXT,
      CONSTRAINT email_unique UNIQUE (email),
      CONSTRAINT userID_unique UNIQUE (userID)
    )
  `);

  // Create index on email for faster lookups
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)
  `);

  // Create index on userID for faster lookups
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_users_userID ON users(userID)
  `);

  console.log("✅ Database initialized successfully");
}

// Initialize on import
initializeDatabase();

// Helper functions for common operations
export const userQueries = {
  // Find user by email
  findByEmail: (email: string) => {
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    return stmt.get(email) as any;
  },

  // Find user by userID
  findByUserID: (userID: string) => {
    const stmt = db.prepare("SELECT * FROM users WHERE userID = ?");
    return stmt.get(userID) as any;
  },

  // Create new user
  create: (userData: {
    userID: string;
    email: string;
    name: string;
    password: string;
    preferences: any;
    settings: any;
    privacy: any;
    createdAt: string;
  }) => {
    const stmt = db.prepare(`
      INSERT INTO users (userID, email, name, password, preferences, settings, privacy, createdAt)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    return stmt.run(
      userData.userID,
      userData.email,
      userData.name,
      userData.password,
      JSON.stringify(userData.preferences),
      JSON.stringify(userData.settings),
      JSON.stringify(userData.privacy),
      userData.createdAt,
    );
  },

  // Update user
  update: (userID: string, updates: any) => {
    const fields: string[] = [];
    const values: any[] = [];

    if (updates.name !== undefined) {
      fields.push("name = ?");
      values.push(updates.name);
    }
    if (updates.preferences !== undefined) {
      fields.push("preferences = ?");
      values.push(JSON.stringify(updates.preferences));
    }
    if (updates.settings !== undefined) {
      fields.push("settings = ?");
      values.push(JSON.stringify(updates.settings));
    }
    if (updates.privacy !== undefined) {
      fields.push("privacy = ?");
      values.push(JSON.stringify(updates.privacy));
    }

    fields.push("lastUpdated = ?");
    values.push(new Date().toISOString());
    values.push(userID);

    const stmt = db.prepare(`
      UPDATE users SET ${fields.join(", ")} WHERE userID = ?
    `);

    return stmt.run(...values);
  },

  // Delete user
  delete: (userID: string) => {
    const stmt = db.prepare("DELETE FROM users WHERE userID = ?");
    return stmt.run(userID);
  },
};
