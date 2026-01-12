import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "ap-southeast-2",
});

export const docClient = DynamoDBDocumentClient.from(client);
export const TABLE_NAME = "ActionPlusUsers";
