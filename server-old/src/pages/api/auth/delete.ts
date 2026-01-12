import { NextApiRequest, NextApiResponse } from "next";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TABLE_NAME } from "../../../lib/dynamodb";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "DELETE") {
    const { userId, timestamp } = req.body;
    
    if (!userId || !timestamp) {
      return res.status(400).json({ 
        success: false, 
        message: "Both userID and timestamp are required" 
      });
    }

    try {
      await docClient.send(
        new DeleteCommand({
          TableName: TABLE_NAME,
          Key: { 
            userID: userId,
            timestamp: timestamp 
          },
        })
      );
      
      res.status(200).json({ 
        success: true, 
        message: "User deleted successfully" 
      });
    } catch (error) {
      console.error("DynamoDB Delete Error:", error);
      res.status(500).json({ 
        success: false, 
        message: "Failed to delete user" 
      });
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
