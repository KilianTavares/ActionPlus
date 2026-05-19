# SQLite Migration Summary

## Changes Made

Successfully migrated from AWS DynamoDB to SQLite for local development.

### Files Created

- **`src/lib/sqlite.ts`** - SQLite database configuration, initialization, and query helpers
- **`data/.gitignore`** - Prevents SQLite database files from being committed to git
- **`data/database.sqlite`** - SQLite database file (auto-created on first run)

### Files Modified

#### Database Layer

- **`src/lib/sqlite.ts`** (NEW) - Replaced `dynamodb.ts` functionality

#### Auth Endpoints

- **`src/pages/api/auth/signUp.ts`** - Now uses SQLite queries
- **`src/pages/api/auth/login.ts`** - Now uses SQLite queries
- **`src/pages/api/auth/refresh.ts`** - Now uses SQLite queries
- **`src/pages/api/auth/delete.ts`** - Simplified (no longer requires timestamp)

#### User Endpoints

- **`src/pages/api/user/profile.ts`** - Now uses SQLite queries

#### Configuration

- **`package.json`** - Removed AWS SDK dependencies (@aws-sdk/client-dynamodb, @aws-sdk/lib-dynamodb)
- **`src/app.ts`** - Added SQLite initialization on startup

### Database Schema

**Users Table:**

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userID TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  preferences TEXT DEFAULT '{}',
  settings TEXT DEFAULT '{}',
  privacy TEXT DEFAULT '{}',
  createdAt TEXT NOT NULL,
  lastUpdated TEXT
)
```

**Indexes:**

- `idx_users_email` on `email` column
- `idx_users_userID` on `userID` column

### Key Differences from DynamoDB

1. **Primary Key:** Simplified from composite key (userID + timestamp) to single auto-increment `id` with unique `userID`
2. **No GSI Required:** Email lookups use standard index instead of Global Secondary Index
3. **JSON Storage:** preferences, settings, and privacy stored as JSON text (parsed on read)
4. **Synchronous Operations:** SQLite operations are synchronous (no async/await needed for queries)
5. **Delete Simplified:** Only requires `userID` (no timestamp needed)

### Helper Functions

The `userQueries` object provides convenient methods:

- `findByEmail(email)` - Find user by email
- `findByUserID(userID)` - Find user by userID
- `create(userData)` - Create new user
- `update(userID, updates)` - Update user fields
- `delete(userID)` - Delete user

## Next Steps

### 1. Install Dependencies

```bash
cd server
npm install
```

This will remove the AWS SDK packages.

### 2. Node.js Version Requirement

The `node:sqlite` module is available in **Node.js 22.5.0+**.

Check your version:

```bash
node --version
```

If you're using Node.js < 22.5.0, you have two options:

- **Option A:** Upgrade to Node.js 22.5+ (recommended)
- **Option B:** Install `better-sqlite3` package and update imports

### 3. Start the Server

```bash
npm run dev
```

The database will be automatically initialized on first run.

### 4. Test Endpoints

All existing endpoints work the same way from the client perspective:

- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh tokens
- `DELETE /api/auth/delete` - Delete user (body: `{ userId }` only, no timestamp needed)
- `GET /api/user/profile` - Get user profile (requires auth)
- `PUT /api/user/profile` - Update user profile (requires auth)

### 5. Environment Variables

You can remove AWS-related environment variables:

- ~~AWS_REGION~~
- ~~AWS_ACCESS_KEY_ID~~
- ~~AWS_SECRET_ACCESS_KEY~~

Keep JWT-related variables:

- `JWT_SECRET`
- `JWT_REFRESH_SECRET`
- `JWT_EXPIRES_IN`
- `JWT_REFRESH_EXPIRES_IN`

## Database Management

### View Database Contents

You can use any SQLite GUI tool or the SQLite CLI:

```bash
# Using SQLite CLI
sqlite3 server/data/database.sqlite

# View all users
SELECT * FROM users;

# Count users
SELECT COUNT(*) FROM users;
```

### Reset Database

To start fresh, simply delete the database file:

```bash
rm server/data/database.sqlite
```

It will be recreated on next server start.

### Backup Database

```bash
cp server/data/database.sqlite server/data/database.backup.sqlite
```

## Production Considerations

⚠️ **Important:** This SQLite setup is configured for **local development only**.

For production, you would need:

1. Persistent file storage solution (cloud storage, EFS, etc.)
2. Database backups strategy
3. Consider PostgreSQL, MySQL, or managed database service
4. File locking mechanisms for multi-instance deployments

SQLite is not recommended for serverless deployments (Lambda, Vercel, etc.) due to ephemeral file systems.

## Troubleshooting

### Error: "Cannot find module 'node:sqlite'"

**Cause:** Node.js version < 22.5.0  
**Solution:** Upgrade Node.js or switch to `better-sqlite3`

### Database file not created

**Cause:** Permission issues or invalid path  
**Solution:** Ensure `server/data` directory has write permissions

### "UNIQUE constraint failed: users.email"

**Cause:** Attempting to create user with existing email  
**Solution:** Expected behavior - email must be unique

## Files You Can Delete (Optional)

If you're completely removing AWS infrastructure:

- `server/src/lib/dynamodb.ts`
- Any AWS SAM/CloudFormation templates
- `serverless.yml` (if exists)
- AWS Lambda deployment scripts
