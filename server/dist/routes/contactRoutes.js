import express from "express";
import { runQuery } from "../db.js";
const router = express.Router();
router.post("/contact", (req, res) => {
    const { userID, enquiryType, name, email, phone, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "Name, email, and message are required" });
    }
    try {
        runQuery(`INSERT INTO contact_messages (user_id, name, email, phone, enquiry_type, message)
       VALUES (?, ?, ?, ?, ?, ?)`, [userID || null, name, email, phone || null, enquiryType || "general", message]);
        return res.json({ success: true, message: "Your message was submitted successfully." });
    }
    catch (error) {
        console.error("Contact form error:", error.message);
        return res.status(503).json({ success: false, message: "Something went wrong" });
    }
});
export default router;
//# sourceMappingURL=contactRoutes.js.map