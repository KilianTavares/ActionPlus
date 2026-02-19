// DTO interfaces for User Profile Management

export interface UserDetailsDto {
  userID: string;
  email: string;
  name: string;
  createdAt?: string;
  lastUpdated?: string;
}

export interface UserPreferencesDto {
  favoriteGenre?: string;
  theme: string;
  language: string;
  notifications: boolean;
  autoplay: boolean;
  quality: string;
}

export interface UserSettingsDto {
  profileVisibility: string;
  emailNotifications: boolean;
  pushNotifications: boolean;
  dataSharing: boolean;
  twoFactorAuth: boolean;
}

export interface UserPrivacyDto {
  showEmail: boolean;
  showActivity: boolean;
  allowMessages: boolean;
  searchable: boolean;
  analyticsOptOut: boolean;
  profileVisibility?: string;
  searchHistory?: boolean;
}

// Main comprehensive profile DTO with nested objects
export interface UserProfileDto {
  details: UserDetailsDto;
  preferences: UserPreferencesDto;
  settings: UserSettingsDto;
  privacy: UserPrivacyDto;
}

// Request DTOs for updates
export interface UpdateUserDetailsDto {
  name?: string;
  email?: string;
}

export interface UpdateUserPreferencesDto {
  favoriteGenre?: string;
  theme?: string;
  language?: string;
  notifications?: boolean;
  autoplay?: boolean;
  quality?: string;
}

export interface UpdateUserSettingsDto {
  profileVisibility?: string;
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  dataSharing?: boolean;
  twoFactorAuth?: boolean;
}

export interface UpdateUserPrivacyDto {
  showEmail?: boolean;
  showActivity?: boolean;
  allowMessages?: boolean;
  searchable?: boolean;
  analyticsOptOut?: boolean;
  profileVisibility?: string;
  searchHistory?: boolean;
}

// Action-based update DTO
export interface ProfileUpdateDto {
  action?: 'preferences' | 'settings' | 'privacy' | 'details';
  data?:
    | UpdateUserPreferencesDto
    | UpdateUserSettingsDto
    | UpdateUserPrivacyDto
    | UpdateUserDetailsDto;
}

// Bulk update DTO
export interface BulkProfileUpdateDto {
  name?: string;
  preferences?: UpdateUserPreferencesDto;
  settings?: UpdateUserSettingsDto;
  privacy?: UpdateUserPrivacyDto;
}

export interface UserProfile {
  details: UserDetailsDto;
  preferences: UserPreferencesDto;
  settings: UserSettingsDto;
  privacy: UserPrivacyDto;
}
