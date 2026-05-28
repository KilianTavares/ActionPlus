import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}
interface LoginBody {
  email: string;
  password: string;
}

// POST /auth/register
router.post(
  "/register",
  (req: Request<{}, {}, RegisterBody>, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
      const result = db
        .prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)")
        .run(name, email, hashedPassword);

      const userId = result.lastInsertRowid as number;

      db.prepare("INSERT INTO user_profiles (user_id) VALUES (?)").run(userId);

      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
        expiresIn: "24h",
      });

      res.json({
        success: true,
        accessToken: token,
        user: { userID: String(userId), name, email },
      });
    } catch (err: any) {
      console.error("Registration error:", err.message);
      if (err.code === "SQLITE_CONSTRAINT_UNIQUE") {
        return res.status(409).json({ message: "Email already registered" });
      }
      res.status(503).json({ message: "Something went wrong" });
    }
  },
);

// POST /auth/login
router.post("/login", (req: Request<{}, {}, LoginBody>, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email) as any;

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "24h",
    });

    res.json({
      success: true,
      accessToken: token,
      user: { userID: String(user.id), name: user.name, email: user.email },
    });
  } catch (err: any) {
    console.error("Login error:", err.message);
    res.status(503).json({ message: "Something went wrong" });
  }
});

export default router;
