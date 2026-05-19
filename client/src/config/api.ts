// Local SQLite-based server
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const API_ENDPOINTS = {
  signup: `${API_BASE_URL}/api/auth/signUp`,
  login: `${API_BASE_URL}/api/auth/login`,
  refresh: `${API_BASE_URL}/api/auth/refresh`,
  delete: `${API_BASE_URL}/api/auth/delete`,
  contact: `${API_BASE_URL}/api/contact`,
  profile: `${API_BASE_URL}/api/user/profile`,
  search: `${API_BASE_URL}/api/search`,
  upload: `${API_BASE_URL}/api/upload`,
};
