"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../../../lib/jwt");
const dynamodb_1 = require("../../../lib/dynamodb");
async function handler(req, res) {
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
            const result = await dynamodb_1.docClient.send(new lib_dynamodb_1.QueryCommand({
                TableName: dynamodb_1.TABLE_NAME,
                IndexName: "email-index", // You'll need to create this GSI
                KeyConditionExpression: "email = :email",
                ExpressionAttributeValues: { ":email": email },
            }));
            if (!result.Items || result.Items.length === 0) {
                return res
                    .status(401)
                    .json({ success: false, message: "Invalid credentials" });
            }
            const user = result.Items[0];
            // Verify password
            const isValidPassword = await bcrypt_1.default.compare(password, user.password);
            if (!isValidPassword) {
                return res
                    .status(401)
                    .json({ success: false, message: "Invalid credentials" });
            }
            // Generate JWT tokens
            const tokens = (0, jwt_1.generateToken)({
                userID: user.userID,
                email: user.email,
                name: user.name,
            });
            res.status(200).json({
                success: true,
                ...tokens,
                user: { userID: user.userID, email: user.email, name: user.name },
            });
        }
        catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ success: false, message: "Login failed" });
        }
    }
    else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
