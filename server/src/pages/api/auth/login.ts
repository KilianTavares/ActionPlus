import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import { generateToken } from "../../../lib/jwt";
import { userQueries } from "../../../lib/sqlite";

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
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password required" });
    }

    try {
      // Query user by email
      const user = userQueries.findByEmail(email);

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

      // Parse JSON fields
      const userData = {
        userID: user.userID,
        email: user.email,
        name: user.name,
      };

      // Generate JWT tokens
      const tokens = generateToken(userData);

      res.status(200).json({
        success: true,
        ...tokens,
        user: userData,
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ success: false, message: "Login failed" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
