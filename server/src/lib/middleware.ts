import { NextApiRequest, NextApiResponse } from "next";
import { verifyToken, UserPayload } from "./jwt";

export interface AuthenticatedRequest extends NextApiRequest {
  user?: UserPayload;
}

export function authenticateToken(
  handler: (req: AuthenticatedRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: AuthenticatedRequest, res: NextApiResponse) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({ success: false, message: "Access token required" });
    }

    const user = verifyToken(token);
    if (!user) {
      return res.status(403).json({ success: false, message: "Invalid or expired token" });
    }

    req.user = user;
    return handler(req, res);
  };
}