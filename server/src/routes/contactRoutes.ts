import express, { Request, Response } from "express";
import db from "../db.js";

interface ContactBody {
  userID?: string;
  queryType?: string;
  name: string;
  email: string;
  phoneNumber?: string;
  registeredUser?: boolean;
  queryText: string;
}

const router = express.Router();

// POST /contact
router.post("/", (req: Request<{}, {}, ContactBody>, res: Response) => {
  const {
    userID,
    queryType,
    name,
    email,
    phoneNumber,
    registeredUser,
    queryText,
  } = req.body;

  if (!name || !email || !queryText) {
    return res
      .status(400)
      .json({ message: "Name, email and query text are required" });
  }

  try {
    db.prepare(
      `INSERT INTO contacts (user_id, query_type, name, email, phone_number, registered_user, query_text)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    ).run(
      userID ?? null,
      queryType ?? null,
      name,
      email,
      phoneNumber ?? null,
      registeredUser ? 1 : 0,
      queryText,
    );

    res.json({
      success: true,
      message: "Your query was sent successfully. We will be in touch.",
    });
  } catch (err: any) {
    console.error("Contact error:", err.message);
    res.status(503).json({ message: "Something went wrong" });
  }
});

export default router;
