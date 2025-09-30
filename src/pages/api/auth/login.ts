import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Mock authentication
    if (email && password) {
      res.status(200).json({
        success: true,
        token: "mock-jwt-token",
        user: { id: 1, email, name: "User" },
      });
    } else {
      res.status(400).json({ success: false, message: "Invalid credentials" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
