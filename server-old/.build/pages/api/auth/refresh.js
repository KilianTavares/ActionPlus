"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const jwt_1 = require("../../../lib/jwt");
const dynamodb_1 = require("../../../lib/dynamodb");
async function handler(req, res) {
    if (req.method === "POST") {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: "Refresh token is required",
            });
        }
        const decoded = (0, jwt_1.verifyRefreshToken)(refreshToken);
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: "Invalid refresh token",
            });
        }
        try {
            const getUserResult = await dynamodb_1.docClient.send(new lib_dynamodb_1.GetCommand({
                TableName: dynamodb_1.TABLE_NAME,
                Key: { userID: decoded.userID },
            }));
            if (!getUserResult.Item) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }
            const tokens = (0, jwt_1.generateToken)({
                userID: getUserResult.Item.userID,
                email: getUserResult.Item.email,
                name: getUserResult.Item.name,
            });
            res.status(200).json({
                success: true,
                ...tokens,
            });
        }
        catch (error) {
            console.error("Token refresh error:", error);
            res.status(500).json({
                success: false,
                message: "Failed to refresh token",
            });
        }
    }
    else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
