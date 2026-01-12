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
const defaults_1 = require("../../../lib/defaults");
async function handler(req, res) {
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
        const hashedPassword = await bcrypt_1.default.hash(password, 12);
        // DynamoDB item structure with defaults
        const dynamoItem = {
            userID: userId,
            timestamp: timestamp,
            email,
            name,
            password: hashedPassword,
            preferences: { ...defaults_1.DEFAULT_USER_DATA.preferences, ...preferences },
            settings: defaults_1.DEFAULT_USER_DATA.settings,
            privacy: defaults_1.DEFAULT_USER_DATA.privacy,
            createdAt: timestamp,
        };
        try {
            // Check if user already exists
            const existingUser = await dynamodb_1.docClient.send(new lib_dynamodb_1.QueryCommand({
                TableName: dynamodb_1.TABLE_NAME,
                IndexName: "email-index",
                KeyConditionExpression: "email = :email",
                ExpressionAttributeValues: { ":email": email },
            }));
            if (existingUser.Items && existingUser.Items.length > 0) {
                return res.status(409).json({
                    success: false,
                    message: "User already exists",
                });
            }
            // Insert to DynamoDB
            await dynamodb_1.docClient.send(new lib_dynamodb_1.PutCommand({
                TableName: dynamodb_1.TABLE_NAME,
                Item: dynamoItem,
            }));
            // Generate JWT tokens
            const tokens = (0, jwt_1.generateToken)({
                userID: userId,
                email,
                name,
            });
            res.status(201).json({
                success: true,
                ...tokens,
                user: { userID: userId, email, name },
                message: "User created successfully",
            });
        }
        catch (error) {
            console.error("SignUp Error:", error);
            res.status(500).json({
                success: false,
                message: "Failed to create user",
            });
        }
    }
    else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
