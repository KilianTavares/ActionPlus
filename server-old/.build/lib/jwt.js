"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = (user) => {
    const accessToken = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET || "default_secret_key", {
        expiresIn: process.env.JWT_EXPIRES_IN || "15m",
    });
    const refreshToken = jsonwebtoken_1.default.sign({ userID: user.userID }, process.env.JWT_REFRESH_SECRET || "default_refresh_secret", { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" });
    return { accessToken, refreshToken };
};
exports.generateToken = generateToken;
const verifyToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "default_secret_key");
    }
    catch (error) {
        return null;
    }
};
exports.verifyToken = verifyToken;
const verifyRefreshToken = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_SECRET || "default_refresh_secret");
    }
    catch (error) {
        return null;
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
