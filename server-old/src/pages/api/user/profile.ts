import { NextApiResponse } from "next";
import { UpdateCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";
import {
  authenticateToken,
  AuthenticatedRequest,
} from "../../../lib/middleware";
import { docClient, TABLE_NAME } from "../../../lib/dynamodb";

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
      const getUserResult = await docClient.send(
        new QueryCommand({
          TableName: TABLE_NAME,
          KeyConditionExpression: "userID = :userID",
          ExpressionAttributeValues: { ":userID": req.user!.userID },
        }),
      );

      if (!getUserResult.Items || getUserResult.Items.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const userItem = getUserResult.Items[0];
      const userData = {
        userID: userItem.userID,
        email: userItem.email,
        name: userItem.name,
        preferences: userItem.preferences,
        settings: userItem.settings,
        privacy: userItem.privacy,
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
      // Get user's current data to find the timestamp (sort key)
      const getUserResult = await docClient.send(
        new QueryCommand({
          TableName: TABLE_NAME,
          KeyConditionExpression: "userID = :userID",
          ExpressionAttributeValues: { ":userID": req.user!.userID },
        }),
      );

      if (!getUserResult.Items || getUserResult.Items.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      const userItem = getUserResult.Items[0];

      let updateExpression = "SET lastUpdated = :lastUpdated";
      let expressionValues: any = { ":lastUpdated": new Date().toISOString() };
      let expressionNames: any = {};

      // Action-based updates (granular)
      if (action && data) {
        switch (action) {
          case "preferences":
            updateExpression += ", preferences = :preferences";
            expressionValues[":preferences"] = {
              ...userItem.preferences,
              ...data,
            };
            break;
          case "settings":
            updateExpression += ", settings = :settings";
            expressionValues[":settings"] = {
              ...userItem.settings,
              ...data,
            };
            break;
          case "privacy":
            updateExpression += ", privacy = :privacy";
            expressionValues[":privacy"] = {
              ...userItem.privacy,
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
        if (name) {
          updateExpression += ", #name = :name";
          expressionNames["#name"] = "name";
          expressionValues[":name"] = name;
        }
        if (preferences) {
          updateExpression += ", preferences = :preferences";
          expressionValues[":preferences"] = preferences;
        }
        if (settings) {
          updateExpression += ", settings = :settings";
          expressionValues[":settings"] = settings;
        }
        if (privacy) {
          updateExpression += ", privacy = :privacy";
          expressionValues[":privacy"] = privacy;
        }
      }

      const updateParams: any = {
        TableName: TABLE_NAME,
        Key: {
          userID: req.user!.userID,
          timestamp: userItem.timestamp,
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionValues,
        ReturnValues: "ALL_NEW",
      };

      if (Object.keys(expressionNames).length > 0) {
        updateParams.ExpressionAttributeNames = expressionNames;
      }

      const result = await docClient.send(new UpdateCommand(updateParams));

      const updatedUser = {
        userID: result.Attributes!.userID,
        email: result.Attributes!.email,
        name: result.Attributes!.name,
        preferences: result.Attributes!.preferences,
        settings: result.Attributes!.settings,
        privacy: result.Attributes!.privacy,
      };

      res.status(200).json({
        success: true,
        message: action
          ? `${action} updated successfully`
          : "Profile updated successfully",
        user: updatedUser,
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
