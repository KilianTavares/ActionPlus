import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { generateToken } from "../../../lib/jwt";
import { userQueries } from "../../../lib/sqlite";
import { DEFAULT_USER_DATA } from "../../../lib/defaults";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  if (req.method === "POST") {
    const { email, name, password, preferences } = req.body;

    // Validate required fields
    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, name, and password are required",
      });
    }

    try {
      // Check if user already exists
      const existingUser = userQueries.findByEmail(email);

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "User already exists",
        });
      }

      // Generate keys
      const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const timestamp = new Date().toISOString();

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create user data
      const userData = {
        userID: userId,
        email,
        name,
        password: hashedPassword,
        preferences: { ...DEFAULT_USER_DATA.preferences, ...preferences },
        settings: DEFAULT_USER_DATA.settings,
        privacy: DEFAULT_USER_DATA.privacy,
        createdAt: timestamp,
      };

      // Insert to SQLite
      userQueries.create(userData);

      // Generate JWT tokens
      const tokens = generateToken({
        userID: userId,
        email,
        name,
      });

      res.status(201).json({
        success: true,
        ...tokens,
        user: { userID: userId, email, name },
        message: "User created successfully",
      });
    } catch (error) {
      console.error("SignUp Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create user",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
