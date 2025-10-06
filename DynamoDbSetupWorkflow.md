# DynamoDB Setup Workflow for Next.js Projects

## Step 1: Install AWS SDK Dependencies

**Location**: `server/package.json`

```bash
npm install @aws-sdk/client-dynamodb @aws-sdk/lib-dynamodb
```

**Add to dependencies**:

```json
"@aws-sdk/client-dynamodb": "^3.0.0",
"@aws-sdk/lib-dynamodb": "^3.0.0"
```

## Step 2: Create Environment Configuration

**File**: `server/.env.local`
**Purpose**: Store AWS credentials and configuration securely

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
```

## Step 3: Create DynamoDB Utility File

**Folder**: Create `server/src/lib/` directory
**File**: `server/src/lib/dynamodb.ts`
**Purpose**: Centralized DynamoDB client configuration and reusable connection

```typescript
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
});

export const docClient = DynamoDBDocumentClient.from(client);
export const TABLE_NAME = "YourTableName";
```

## Step 4: Create AWS DynamoDB Table

**Location**: AWS Console → DynamoDB → Tables

- Table name: Match `TABLE_NAME` in utility file
- Partition key: Choose appropriate field (e.g., `userID`)
- Sort key: Optional, for multiple items per partition
- **Important**: Note exact case-sensitive key names

## Step 5: Create API Endpoint

**File**: `server/src/pages/api/[resource]/create.ts`
**Purpose**: Handle POST requests and insert data to DynamoDB

```typescript
import { NextApiRequest, NextApiResponse } from "next";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { docClient, TABLE_NAME } from "../../../lib/dynamodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      /* destructure request body */
    } = req.body;

    // Generate partition/sort keys
    const partitionKey = `prefix_${Date.now()}`;
    const sortKey = new Date().toISOString();

    const dynamoItem = {
      partitionKeyName: partitionKey, // Must match table schema exactly
      sortKeyName: sortKey, // Must match table schema exactly
      // ...other fields
    };

    try {
      await docClient.send(
        new PutCommand({
          TableName: TABLE_NAME,
          Item: dynamoItem,
        })
      );

      res.status(201).json({ success: true });
    } catch (error) {
      console.error("DynamoDB Error:", error);
      res.status(500).json({ success: false });
    }
  }
}
```

## Step 6: Configure AWS Credentials

**Methods**:

1. **Environment variables** (recommended for development)
2. **IAM roles** (recommended for production)
3. **AWS CLI configuration**

**Find credentials**: AWS Console → IAM → Users → [Username] → Security credentials

## Step 7: Test Integration

**Test endpoint**:

```bash
POST http://localhost:3001/api/[resource]/create
Content-Type: application/json

{
  "field1": "value1",
  "field2": "value2"
}
```

## File Structure Summary

```
server/
├── src/
│   ├── lib/
│   │   └── dynamodb.ts          # DynamoDB client configuration
│   └── pages/
│       └── api/
│           └── [resource]/
│               └── create.ts    # API endpoint for data insertion
├── .env.local                   # AWS credentials (never commit)
└── package.json                 # AWS SDK dependencies
```

## Key Reminders

- **Case sensitivity**: DynamoDB key names must match exactly
- **Security**: Never commit `.env.local` to version control
- **Reusability**: Import `docClient` and `TABLE_NAME` from utility file
- **Error handling**: Always wrap DynamoDB operations in try-catch
- **Key generation**: Generate unique partition keys server-side

This workflow can be adapted for any Next.js project requiring DynamoDB integration.
