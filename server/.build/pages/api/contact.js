"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
function handler(req, res) {
    if (req.method === "POST") {
        const { name, email, phone, enquiryType, message } = req.body;
        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and message are required",
            });
        }
        // Mock processing - replace with actual email service
        console.log("Contact form submission:", {
            name,
            email,
            phone,
            enquiryType,
            message,
        });
        res.status(200).json({
            success: true,
            message: "Contact form submitted successfully",
        });
    }
    else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
