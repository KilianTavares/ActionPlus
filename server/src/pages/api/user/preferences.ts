import { NextApiResponse } from "next";
import { UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import {
  authenticateToken,
  AuthenticatedRequest,
} from "../../../lib/middleware";
import { docClient, TABLE_NAME } from "../../../lib/dynamodb";

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { name, preferences, settings } = req.body;

    try {
      // Get user's current data to find the timestamp (sort key)
      const getUserResult = await docClient.send(
        new GetCommand({
          TableName: TABLE_NAME,
          Key: { userID: req.user!.userID },
        })
      );

      if (!getUserResult.Item) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      // Update user profile
      const updateParams: any = {
        TableName: TABLE_NAME,
        Key: {
          userID: req.user!.userID,
          timestamp: getUserResult.Item.timestamp,
        },
        UpdateExpression: "SET lastUpdated = :lastUpdated",
        ExpressionAttributeValues: {
          ":lastUpdated": new Date().toISOString(),
        },
        ReturnValues: "ALL_NEW",
      };

      // Add optional fields to update
      if (name) {
        updateParams.UpdateExpression += ", #name = :name";
        updateParams.ExpressionAttributeNames = { "#name": "name" };
        updateParams.ExpressionAttributeValues[":name"] = name;
      }
      if (preferences) {
        updateParams.UpdateExpression += ", preferences = :preferences";
        updateParams.ExpressionAttributeValues[":preferences"] = preferences;
      }
      if (settings) {
        updateParams.UpdateExpression += ", settings = :settings";
        updateParams.ExpressionAttributeValues[":settings"] = settings;
      }

      const result = await docClient.send(new UpdateCommand(updateParams));

      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: {
          userID: result.Attributes!.userID,
          email: result.Attributes!.email,
          name: result.Attributes!.name,
          preferences: result.Attributes!.preferences,
          settings: result.Attributes!.settings,
        },
      });
    } catch (error) {
      console.error("Profile update error:", error);
      res
        .status(500)
        .json({ success: false, message: "Failed to update profile" });
    }
  }
}
