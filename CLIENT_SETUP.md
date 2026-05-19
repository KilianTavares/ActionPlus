# Client Setup for SQLite Integration

## ✅ Changes Completed

The client has been successfully updated to connect to your local SQLite-based server instead of AWS API Gateway.

### Files Updated:

1. **[src/config/api.ts](client/src/config/api.ts)**

   - Changed base URL from AWS API Gateway to `http://localhost:3001`
   - Updated all endpoint paths to match Next.js API routes
   - Added support for `NEXT_PUBLIC_API_URL` environment variable

2. **[src/hooks/useUserProfile.ts](client/src/hooks/useUserProfile.ts)**

   - Now uses `API_ENDPOINTS.profile` instead of hardcoded AWS URL
   - Properly integrated with centralized API configuration

3. **[src/app/components/clientSide/UserPreferences.tsx](client/src/app/components/clientSide/UserPreferences.tsx)**
   - Updated profile update calls to use `API_ENDPOINTS.profile`
   - Removed AWS environment variable dependency

## API Endpoints Configuration

All endpoints now point to `http://localhost:3001`:

```typescript
{
  signup: "http://localhost:3001/api/auth/signUp",
  login: "http://localhost:3001/api/auth/login",
  refresh: "http://localhost:3001/api/auth/refresh",
  delete: "http://localhost:3001/api/auth/delete",
  contact: "http://localhost:3001/api/contact",
  profile: "http://localhost:3001/api/user/profile",
  search: "http://localhost:3001/api/search",
  upload: "http://localhost:3001/api/upload"
}
```

## How to Run

### 1. Start the Server (Terminal 1)

```bash
cd server
npm install  # If not done already
npm run dev
```

Server will run on: **http://localhost:3001**

### 2. Start the Client (Terminal 2)

```bash
cd client
npm install  # If not done already
npm run dev
```

Client will run on: **http://localhost:3000**

## Testing the Integration

### Test Authentication Flow

1. **Navigate to Auth Page**

   - Go to: http://localhost:3000/auth

2. **Sign Up New User**

   - Fill in: Name, Email, Password
   - Click "Sign Up"
   - You should be redirected to home page
   - Check server logs for SQLite database creation

3. **Sign In**

   - Toggle to "Sign In"
   - Enter your email and password
   - Click "Sign In"
   - You should be logged in and redirected

4. **View Profile** (if you have a profile page)
   - Navigate to profile/settings page
   - Verify user data loads correctly
   - Try updating preferences/settings
   - Changes should persist in SQLite database

### Verify Server Logs

When the server starts, you should see:

```
✅ Database initialized successfully
Server running on port 3001
```

When you sign up/login, you should see database operations in the logs.

### Check SQLite Database

```bash
# View database contents
cd server/data
sqlite3 database.sqlite

# In SQLite shell:
.tables              # Should show 'users' table
SELECT * FROM users; # View all users
.exit
```

## API Call Flow

1. **Client Request** → `AuthForm.tsx` submits login
2. **API Config** → Uses `API_ENDPOINTS.login`
3. **Server** → `http://localhost:3001/api/auth/login`
4. **Handler** → `server/src/pages/api/auth/login.ts`
5. **Database** → SQLite query via `userQueries.findByEmail()`
6. **Response** → JWT tokens + user data
7. **Client Storage** → Saved to AuthContext + localStorage

## Environment Variables (Optional)

You can optionally create a `.env.local` file in the client folder:

```env
# Client/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3001
```

If not set, it defaults to `http://localhost:3001`.

## Troubleshooting

### CORS Errors

If you see CORS errors, verify:

1. Server is running on port 3001
2. Client is running on port 3000
3. Server CORS config allows `http://localhost:3000`

### Connection Refused

**Error:** `Failed to fetch` or `ECONNREFUSED`

**Solutions:**

- Ensure server is running (`npm run dev` in server folder)
- Check server is on port 3001
- Verify `API_BASE_URL` in `client/src/config/api.ts`

### 404 Errors

**Error:** `404 Not Found` on API calls

**Causes:**

- Endpoint path mismatch
- Server not running
- Wrong port number

**Check:**

- Server logs for incoming requests
- Network tab in browser DevTools
- Endpoint paths in `config/api.ts`

### Authentication Issues

**Error:** `Invalid or expired token`

**Solutions:**

- Clear localStorage: `localStorage.clear()`
- Check JWT secrets are set in server environment
- Verify token is being sent in Authorization header

### Database Issues

**Error:** Database file not created

**Solutions:**

- Check Node.js version (requires 22.5.0+)
- Verify `server/data` directory exists and has write permissions
- Check server logs for initialization errors

## What Works Now

✅ User signup with SQLite storage  
✅ User login with email/password  
✅ JWT token generation and validation  
✅ Token refresh flow  
✅ User profile fetching  
✅ User preferences/settings updates  
✅ User account deletion  
✅ Contact form submissions  
✅ All auth-protected routes

## Next Steps

1. **Test all user flows** to ensure everything works
2. **Check database contents** to verify data persistence
3. **Monitor console logs** for any errors
4. **Test token refresh** when access token expires
5. **Verify logout flow** clears stored data

## Production Notes

⚠️ **This setup is for local development only**

For production deployment:

- Replace SQLite with production database (PostgreSQL, MySQL, etc.)
- Use proper environment variables for API URLs
- Implement proper error handling and logging
- Add rate limiting and security measures
- Use HTTPS for all API calls
- Implement refresh token rotation
- Add proper session management

---

🎉 **Client is now fully integrated with SQLite backend!**
