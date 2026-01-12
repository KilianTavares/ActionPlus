# Settings Routing & Default Preferences

## Overview

Unified settings management system with HTTP-based updates and default user preferences applied during account creation.

## File Structure & Purposes

### Server Files

**`src/lib/defaults.ts`**

- Defines default preferences, settings, and privacy configurations
- Applied automatically during user signup

**`src/pages/api/user/profile.ts`** (Consolidated)

- Unified endpoint supporting both action-based and direct field updates
- Handles preferences, settings, privacy, and name updates
- Standard HTTP responses for updates

**`src/pages/api/auth/signUp.ts`** (Modified)

- Applies default user data during account creation
- Merges custom preferences with defaults



## API Usage

### Action-based Update (Granular)

```
PUT /api/user/profile
{
  "action": "preferences|settings|privacy",
  "data": { /* updated fields */ }
}
```

### Direct Field Update (Bulk)

```
PUT /api/user/profile
{
  "name": "New Name",
  "preferences": {},
  "settings": {},
  "privacy": {}
}
```

## Features

- Default preferences applied on signup
- HTTP-based updates
- Granular settings updates
- Flat data structure for easy querying
