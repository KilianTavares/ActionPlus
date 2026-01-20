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
  "/contact",
  async (req: Request<{}, {}, AuthInterface>, res: Response) => {
    const { userID, queryType, name, email, phoneNumber registeredUser, queryText } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
      const insertUserQuery = `
      INSERT INTO users (userID, queryType, name, email, phoneNumber registeredUser, queryText )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
      const userResult = await pool.query(insertUserQuery, [
       userID, queryType, name, email, phoneNumber registeredUser, queryText
      ]);
      const userId = userResult.rows[0].id;

      res.send(
        'Your query was sent successfully, We will be in touch')
    } catch (err: any) {
      console.error("Registration error:", err.message);

      res.status(503).send("Something went wrong");
    }
  },
);

export default router;
