import { NextApiRequest, NextApiResponse } from "next";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import bcrypt from "bcrypt";
import { generateToken } from "../../../lib/jwt";
import { docClient, TABLE_NAME } from "../../../lib/dynamodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
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
      const result = await docClient.send(
        new QueryCommand({
          TableName: TABLE_NAME,
          IndexName: "email-index", // You'll need to create this GSI
          KeyConditionExpression: "email = :email",
          ExpressionAttributeValues: { ":email": email },
        })
      );

      if (!result.Items || result.Items.length === 0) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

      const user = result.Items[0];

      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }

      // Generate JWT token
      const token = generateToken({
        userID: user.userID,
        email: user.email,
        name: user.name,
      });

      res.status(200).json({
        success: true,
        token,
        user: { userID: user.userID, email: user.email, name: user.name },
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
