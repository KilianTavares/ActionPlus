"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const middleware_1 = require("../../../lib/middleware");
const dynamodb_1 = require("../../../lib/dynamodb");
async function handler(req, res) {
    if (req.method === "GET") {
        // req.user is available because of middleware
        res.status(200).json({
            success: true,
            user: req.user,
        });
    }
    else if (req.method === "PUT") {
        const { action, data, name, privacy, preferences, settings } = req.body;
        try {
            // Get user's current data to find the timestamp (sort key)
            const getUserResult = await dynamodb_1.docClient.send(new lib_dynamodb_1.GetCommand({
                TableName: dynamodb_1.TABLE_NAME,
                Key: { userID: req.user.userID },
            }));
            if (!getUserResult.Item) {
                return res
                    .status(404)
                    .json({ success: false, message: "User not found" });
            }
            let updateExpression = "SET lastUpdated = :lastUpdated";
            let expressionValues = { ":lastUpdated": new Date().toISOString() };
            let expressionNames = {};
            // Action-based updates (granular)
            if (action && data) {
                switch (action) {
                    case "preferences":
                        updateExpression += ", preferences = :preferences";
                        expressionValues[":preferences"] = {
                            ...getUserResult.Item.preferences,
                            ...data,
                        };
                        break;
                    case "settings":
                        updateExpression += ", settings = :settings";
                        expressionValues[":settings"] = {
                            ...getUserResult.Item.settings,
                            ...data,
                        };
                        break;
                    case "privacy":
                        updateExpression += ", privacy = :privacy";
                        expressionValues[":privacy"] = {
                            ...getUserResult.Item.privacy,
                            ...data,
                        };
                        break;
                    default:
                        return res
                            .status(400)
                            .json({ success: false, message: "Invalid action" });
                }
            }
            else {
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
            const updateParams = {
                TableName: dynamodb_1.TABLE_NAME,
                Key: {
                    userID: req.user.userID,
                    timestamp: getUserResult.Item.timestamp,
                },
                UpdateExpression: updateExpression,
                ExpressionAttributeValues: expressionValues,
                ReturnValues: "ALL_NEW",
            };
            if (Object.keys(expressionNames).length > 0) {
                updateParams.ExpressionAttributeNames = expressionNames;
            }
            const result = await dynamodb_1.docClient.send(new lib_dynamodb_1.UpdateCommand(updateParams));
            const updatedUser = {
                userID: result.Attributes.userID,
                email: result.Attributes.email,
                name: result.Attributes.name,
                preferences: result.Attributes.preferences,
                settings: result.Attributes.settings,
                privacy: result.Attributes.privacy,
            };
            res.status(200).json({
                success: true,
                message: action
                    ? `${action} updated successfully`
                    : "Profile updated successfully",
                user: updatedUser,
            });
        }
        catch (error) {
            console.error(`❌ Profile update failed for user ${req.user.userID}:`, error);
            res
                .status(500)
                .json({ success: false, message: "Failed to update profile" });
        }
    }
    else {
        res.setHeader("Allow", ["GET", "PUT"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
exports.default = (0, middleware_1.authenticateToken)(handler);
