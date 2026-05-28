import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getRow, runQuery } from "../db.js";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();
const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const token = authHeader.replace("Bearer ", "");
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = payload.id;
        next();
    }
    catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};
router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    const hashedPassword = bcrypt.hashSync(password, 8);
    try {
        const userId = runQuery(`INSERT INTO users (email, password, name, preferences, settings, privacy)
       VALUES (?, ?, ?, ?, ?, ?)`, [
            email,
            hashedPassword,
            name || "",
            JSON.stringify({ favoriteGenre: "action", notifications: true, autoplay: false, language: "en" }),
            JSON.stringify({}),
            JSON.stringify({}),
        ]);
        if (!userId) {
            throw new Error("Failed to create user");
        }
        const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });
        return res.json({
            success: true,
            accessToken: token,
            user: { userID: userId, email, name: name || "" },
        });
    }
    catch (error) {
        console.error("Registration error:", error.message);
        if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
            return res.status(409).json({ success: false, message: "Email already exists" });
        }
        return res.status(503).json({ success: false, message: "Something went wrong" });
    }
});
router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required" });
    }
    try {
        const user = getRow(`SELECT * FROM users WHERE email = ?`, [email]);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const passwordIsValid = bcrypt.compareSync(password, user.password);
        if (!passwordIsValid) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });
        return res.json({
            success: true,
            accessToken: token,
            user: { userID: user.id, email: user.email, name: user.name || "" },
        });
    }
    catch (error) {
        console.error("Login error:", error.message);
        return res.status(503).json({ success: false, message: "Something went wrong" });
    }
});
router.get("/profile", authenticate, (req, res) => {
    const userId = Number(req.userId);
    try {
        const user = getRow(`SELECT * FROM users WHERE id = ?`, [userId]);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        return res.json({
            success: true,
            user: {
                userID: user.id,
                email: user.email,
                name: user.name,
                preferences: user.preferences ? JSON.parse(user.preferences) : {},
                settings: user.settings ? JSON.parse(user.settings) : {},
                privacy: user.privacy ? JSON.parse(user.privacy) : {},
            },
        });
    }
    catch (error) {
        console.error("Profile fetch error:", error.message);
        return res.status(503).json({ success: false, message: "Something went wrong" });
    }
});
router.put("/profile", authenticate, (req, res) => {
    const userId = Number(req.userId);
    const { action, data } = req.body;
    if (!action || !data) {
        return res.status(400).json({ success: false, message: "Action and data are required" });
    }
    try {
        const user = getRow(`SELECT preferences, settings, privacy FROM users WHERE id = ?`, [userId]);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        const preferences = user.preferences ? JSON.parse(user.preferences) : {};
        const settings = user.settings ? JSON.parse(user.settings) : {};
        const privacy = user.privacy ? JSON.parse(user.privacy) : {};
        let updatedPreferences = preferences;
        let updatedSettings = settings;
        let updatedPrivacy = privacy;
        if (action === "preferences") {
            updatedPreferences = { ...preferences, ...data };
        }
        else if (action === "settings") {
            updatedSettings = { ...settings, ...data };
        }
        else if (action === "privacy") {
            updatedPrivacy = { ...privacy, ...data };
        }
        else {
            return res.status(400).json({ success: false, message: "Unknown action" });
        }
        runQuery(`UPDATE users SET preferences = ?, settings = ?, privacy = ? WHERE id = ?`, [
            JSON.stringify(updatedPreferences),
            JSON.stringify(updatedSettings),
            JSON.stringify(updatedPrivacy),
            userId,
        ]);
        return res.json({ success: true, user: { userID: userId, preferences: updatedPreferences, settings: updatedSettings, privacy: updatedPrivacy } });
    }
    catch (error) {
        console.error("Profile update error:", error.message);
        return res.status(503).json({ success: false, message: "Something went wrong" });
    }
});
export default router;
//# sourceMappingURL=authRoutes.js.map