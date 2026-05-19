import { NextApiResponse } from "next";
import {
  authenticateToken,
  AuthenticatedRequest,
} from "../../../lib/middleware";
import { userQueries } from "../../../lib/sqlite";

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  // Handle CORS first
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "GET") {
    try {
      const user = userQueries.findByUserID(req.user!.userID);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const userData = {
        userID: user.userID,
        email: user.email,
        name: user.name,
        preferences: JSON.parse(user.preferences || "{}"),
        settings: JSON.parse(user.settings || "{}"),
        privacy: JSON.parse(user.privacy || "{}"),
      };

      res.status(200).json({
        success: true,
        user: userData,
      });
    } catch (error) {
      console.error(
        `❌ Profile fetch failed for user ${req.user!.userID}:`,
        error,
      );
      res
        .status(500)
        .json({ success: false, message: "Failed to fetch profile" });
    }
  } else if (req.method === "PUT") {
    const { action, data, name, privacy, preferences, settings } = req.body;

    try {
      // Get user's current data
      const user = userQueries.findByUserID(req.user!.userID);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const updates: any = {};

      // Action-based updates (granular)
      if (action && data) {
        switch (action) {
          case "preferences":
            updates.preferences = {
              ...JSON.parse(user.preferences || "{}"),
              ...data,
            };
            break;
          case "settings":
            updates.settings = {
              ...JSON.parse(user.settings || "{}"),
              ...data,
            };
            break;
          case "privacy":
            updates.privacy = {
              ...JSON.parse(user.privacy || "{}"),
              ...data,
            };
            break;
          default:
            return res
              .status(400)
              .json({ success: false, message: "Invalid action" });
        }
      } else {
        // Direct field updates (bulk)
        if (name) updates.name = name;
        if (preferences) updates.preferences = preferences;
        if (settings) updates.settings = settings;
        if (privacy) updates.privacy = privacy;
      }

      // Update user
      userQueries.update(req.user!.userID, updates);

      // Fetch updated user
      const updatedUser = userQueries.findByUserID(req.user!.userID);

      const responseUser = {
        userID: updatedUser.userID,
        email: updatedUser.email,
        name: updatedUser.name,
        preferences: JSON.parse(updatedUser.preferences || "{}"),
        settings: JSON.parse(updatedUser.settings || "{}"),
        privacy: JSON.parse(updatedUser.privacy || "{}"),
      };

      res.status(200).json({
        success: true,
        message: action
          ? `${action} updated successfully`
          : "Profile updated successfully",
        user: responseUser,
      });
    } catch (error) {
      console.error(
        `❌ Profile update failed for user ${req.user!.userID}:`,
        error,
      );
      res
        .status(500)
        .json({ success: false, message: "Failed to update profile" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "OPTIONS"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// Handle CORS before authentication
function corsHandler(req: any, res: NextApiResponse, next: () => void) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  next();
}

export default function (req: any, res: NextApiResponse) {
  corsHandler(req, res, () => {
    authenticateToken(handler)(req, res);
  });
}
