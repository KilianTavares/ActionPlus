import { NextApiRequest, NextApiResponse } from "next";
import { PutCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
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
    const { email, name, password, preferences } = req.body;

    // Validate required fields
    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "Email, name, and password are required",
      });
    }

    // Generate keys
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // DynamoDB item structure
    const dynamoItem = {
      userID: userId,
      timestamp: timestamp,
      email,
      name,
      password: hashedPassword,
      preferences,
      createdAt: timestamp,
    };

    try {
      // Check if user already exists
      const existingUser = await docClient.send(
        new QueryCommand({
          TableName: TABLE_NAME,
          IndexName: "email-index",
          KeyConditionExpression: "email = :email",
          ExpressionAttributeValues: { ":email": email },
        })
      );

      if (existingUser.Items && existingUser.Items.length > 0) {
        return res.status(409).json({
          success: false,
          message: "User already exists",
        });
      }

      // Insert to DynamoDB
      await docClient.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: dynamoItem,
        })
      );

      // Generate JWT token
      const token = generateToken({
        userID: userId,
        email,
        name,
      });

      res.status(201).json({
        success: true,
        token,
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
