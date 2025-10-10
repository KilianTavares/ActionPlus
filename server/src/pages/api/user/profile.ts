import { NextApiResponse } from "next";
import { UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import {
  authenticateToken,
  AuthenticatedRequest,
} from "../../../lib/middleware";
import { docClient, TABLE_NAME } from "../../../lib/dynamodb";


async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // req.user is available because of middleware
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } else if (req.method === "PUT") {
    const { privacy, preferences, settings } = req.body;

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
      if (preferences) {
        updateParams.UpdateExpression += ", preferences = :preferences";
        updateParams.ExpressionAttributeValues[":preferences"] = preferences;
      }
      if (settings) {
        updateParams.UpdateExpression += ", settings = :settings";
        updateParams.ExpressionAttributeValues[":settings"] = settings;
      }
      if (privacy) {
        updateParams.UpdateExpression += ", privacy = :privacy";
        updateParams.ExpressionAttributeValues[":privacy"] = privacy;
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



      console.log(`✅ User ${req.user!.userID} successfully updated profile`);
      
      res.status(200).json({
        success: true,
        message: "Profile updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      console.error(`❌ Profile update failed for user ${req.user!.userID}:`, error);
      res
        .status(500)
        .json({ success: false, message: "Failed to update profile" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authenticateToken(handler);
