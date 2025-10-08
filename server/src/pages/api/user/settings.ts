import { NextApiResponse } from "next";
import { UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import {
  authenticateToken,
  AuthenticatedRequest,
} from "../../../lib/middleware";
import { docClient, TABLE_NAME } from "../../../lib/dynamodb";
import { notifyUserUpdate } from "../../../lib/websocket";

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === "PUT") {
    const { action, data } = req.body;

    try {
      const getUserResult = await docClient.send(
        new GetCommand({
          TableName: TABLE_NAME,
          Key: { userID: req.user!.userID },
        })
      );

      if (!getUserResult.Item) {
        return res.status(404).json({ success: false, message: "User not found" });
      }

      let updateExpression = "SET lastUpdated = :lastUpdated";
      let expressionValues: any = { ":lastUpdated": new Date().toISOString() };

      // Handle different setting actions
      switch (action) {
        case "preferences":
          updateExpression += ", preferences = :preferences";
          expressionValues[":preferences"] = { ...getUserResult.Item.preferences, ...data };
          break;
        case "settings":
          updateExpression += ", settings = :settings";
          expressionValues[":settings"] = { ...getUserResult.Item.settings, ...data };
          break;
        case "privacy":
          updateExpression += ", privacy = :privacy";
          expressionValues[":privacy"] = { ...getUserResult.Item.privacy, ...data };
          break;
        default:
          return res.status(400).json({ success: false, message: "Invalid action" });
      }

      const result = await docClient.send(new UpdateCommand({
        TableName: TABLE_NAME,
        Key: {
          userID: req.user!.userID,
          timestamp: getUserResult.Item.timestamp,
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionValues,
        ReturnValues: "ALL_NEW",
      }));

      const updatedUser = {
        userID: result.Attributes!.userID,
        preferences: result.Attributes!.preferences,
        settings: result.Attributes!.settings,
        privacy: result.Attributes!.privacy,
      };

      notifyUserUpdate(req.user!.userID, updatedUser);

      res.status(200).json({
        success: true,
        message: `${action} updated successfully`,
        user: updatedUser,
      });
    } catch (error) {
      console.error("Settings update error:", error);
      res.status(500).json({ success: false, message: "Failed to update settings" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authenticateToken(handler);