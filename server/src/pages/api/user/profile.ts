import { NextApiResponse } from "next";
import { authenticateToken, AuthenticatedRequest } from "../../../lib/middleware";

async function handler(req: AuthenticatedRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // req.user is available because of middleware
    res.status(200).json({
      success: true,
      user: req.user
    });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export default authenticateToken(handler);