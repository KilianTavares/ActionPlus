"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = authenticateToken;
const jwt_1 = require("./jwt");
function authenticateToken(handler) {
    return async (req, res) => {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
        if (!token) {
            return res.status(401).json({ success: false, message: "Access token required" });
        }
        const user = (0, jwt_1.verifyToken)(token);
        if (!user) {
            return res.status(403).json({ success: false, message: "Invalid or expired token" });
        }
        req.user = user;
        return handler(req, res);
    };
}
