export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5003";

export const API_ENDPOINTS = {
  signup: `${API_BASE_URL}/auth/register`,
  login: `${API_BASE_URL}/auth/login`,
  contact: `${API_BASE_URL}/contact`,
  profile: `${API_BASE_URL}/profile`,
  upload: `${API_BASE_URL}/upload`,
};
