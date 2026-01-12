import { NextApiRequest, NextApiResponse } from "next";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import { generateToken, verifyRefreshToken } from "../../../lib/jwt";
import { docClient, TABLE_NAME } from "../../../lib/dynamodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required",
      });
    }

    const decoded = verifyRefreshToken(refreshToken);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    try {
      const getUserResult = await docClient.send(
        new GetCommand({
          TableName: TABLE_NAME,
          Key: { userID: decoded.userID },
        })
      );

      if (!getUserResult.Item) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      const tokens = generateToken({
        userID: getUserResult.Item.userID,
        email: getUserResult.Item.email,
        name: getUserResult.Item.name,
      });

      res.status(200).json({
        success: true,
        ...tokens,
      });
    } catch (error) {
      console.error("Token refresh error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to refresh token",
      });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}