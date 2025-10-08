# Settings Routing & Default Preferences

## Overview

Unified settings management system with real-time updates and default user preferences applied during account creation.

## File Structure & Purposes

### Server Files

**`src/lib/defaults.ts`**

- Defines default preferences, settings, and privacy configurations
- Applied automatically during user signup

**`src/lib/websocket.ts`**

- WebSocket server initialization and connection management
- Real-time notification system for settings updates

**`src/pages/api/user/settings.ts`**

- Dedicated settings endpoint with action-based routing
- Handles preferences, settings, and privacy updates
- Triggers real-time notifications

**`src/pages/api/user/profile.ts`** (Modified)

- Enhanced with WebSocket notifications
- Includes privacy field in responses

**`src/pages/api/auth/signUp.ts`** (Modified)

- Applies default user data during account creation
- Merges custom preferences with defaults

### Client Files

**`client/src/utils/websocket.ts`**

- Client-side WebSocket connection utilities
- Real-time update listeners and connection management

## API Usage

### Settings Update

```
PUT /api/user/settings
{
  "action": "preferences|settings|privacy",
  "data": { /* updated fields */ }
}
```

### Profile Update (Existing)

```
PUT /api/user/profile
{
  "preferences": {},
  "settings": {},
  "privacy": {}
}
```

## Features

- Default preferences applied on signup
- Real-time WebSocket notifications
- Granular settings updates
- Flat data structure for easy querying
