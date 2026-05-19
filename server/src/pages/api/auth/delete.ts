import { NextApiRequest, NextApiResponse } from "next";
import { userQueries } from "../../../lib/sqlite";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "DELETE") {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "userID is required",
      });
    }

    try {
      userQueries.delete(userId);

      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("DynamoDB Delete Error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to delete user",
      });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
