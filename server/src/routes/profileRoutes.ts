import express, { Request, Response } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import db from "../db.js";

interface AuthenticatedRequest extends Request {
  userId?: number;
}

const router = express.Router();

// GET /profile — return the authenticated user's full profile
router.get("/", authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId!;

  try {
    const user = db
      .prepare("SELECT id, name, email FROM users WHERE id = ?")
      .get(userId) as any;

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const profileRow = db
      .prepare(
        "SELECT preferences, settings, privacy FROM user_profiles WHERE user_id = ?",
      )
      .get(userId) as any;

    res.json({
      success: true,
      user: {
        userID: String(user.id),
        name: user.name,
        email: user.email,
        preferences: profileRow ? JSON.parse(profileRow.preferences) : {},
        settings: profileRow ? JSON.parse(profileRow.settings) : {},
        privacy: profileRow ? JSON.parse(profileRow.privacy) : {},
      },
    });
  } catch (err: any) {
    console.error("Profile fetch error:", err.message);
    res.status(503).json({ success: false, message: "Something went wrong" });
  }
});

// PUT /profile — update one section (preferences | settings | privacy)
router.put("/", authMiddleware, (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId!;
  const { action, data } = req.body as {
    action: "preferences" | "settings" | "privacy";
    data: Record<string, unknown>;
  };

  const allowed = ["preferences", "settings", "privacy"];
  if (!allowed.includes(action)) {
    return res.status(400).json({ success: false, message: "Invalid action" });
  }

  try {
    const existing = db
      .prepare("SELECT id FROM user_profiles WHERE user_id = ?")
      .get(userId);

    if (existing) {
      db.prepare(
        `UPDATE user_profiles SET ${action} = ?, updated_at = datetime('now') WHERE user_id = ?`,
      ).run(JSON.stringify(data), userId);
    } else {
      db.prepare(
        `INSERT INTO user_profiles (user_id, ${action}) VALUES (?, ?)`,
      ).run(userId, JSON.stringify(data));
    }

    res.json({ success: true });
  } catch (err: any) {
    console.error("Profile update error:", err.message);
    res.status(503).json({ success: false, message: "Something went wrong" });
  }
});

export default router;
