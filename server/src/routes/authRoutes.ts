import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../db.js";
import { AuthInterface } from "../shared/interfaces.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// POST /auth/register
router.post(
  "/register",
  async (req: Request<{}, {}, AuthInterface>, res: Response) => {
    const { username, password } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
      const insertUserQuery = `
      INSERT INTO users (username, password)
      VALUES ($1, $2)
      RETURNING id
    `;
      const userResult = await pool.query(insertUserQuery, [
        username,
        hashedPassword,
      ]);
      const userId = userResult.rows[0].id;

      const token = jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
        expiresIn: "24h",
      });

      res.json({ token });
    } catch (err: any) {
      console.error("Registration error:", err.message);

      // Conflict on email (already taken)
      if (err.code === "23505") {
        return res.status(409).json({ message: "Username already exists" });
      }

      res.status(503).send("Something went wrong");
    }
  },
);

// POST /auth/login
router.post(
  "/login",
  async (req: Request<{}, {}, AuthInterface>, res: Response) => {
    const { username, password } = req.body;

    try {
      const findUserQuery = `
      SELECT * FROM users WHERE username = $1
    `;
      const userResult = await pool.query(findUserQuery, [username]);
      const user = userResult.rows[0];

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const passwordIsValid = bcrypt.compareSync(password, user.password);

      if (!passwordIsValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "24h",
        },
      );

      res.json({ token });
    } catch (err: any) {
      console.error("Login error:", err.message);
      res.status(503).send("Something went wrong");
    }
  },
);

export default router;
