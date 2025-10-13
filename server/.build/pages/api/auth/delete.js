"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const dynamodb_1 = require("../../../lib/dynamodb");
async function handler(req, res) {
    if (req.method === "DELETE") {
        const { userId, timestamp } = req.body;
        if (!userId || !timestamp) {
            return res.status(400).json({
                success: false,
                message: "Both userID and timestamp are required"
            });
        }
        try {
            await dynamodb_1.docClient.send(new lib_dynamodb_1.DeleteCommand({
                TableName: dynamodb_1.TABLE_NAME,
                Key: {
                    userID: userId,
                    timestamp: timestamp
                },
            }));
            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            });
        }
        catch (error) {
            console.error("DynamoDB Delete Error:", error);
            res.status(500).json({
                success: false,
                message: "Failed to delete user"
            });
        }
    }
    else {
        res.setHeader("Allow", ["DELETE"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
