import { getAuthHeaders, isTokenExpired, getToken } from './auth';

const API_BASE_URL = 'http://localhost:3001/api';

export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  
  // Check token expiration
  if (token && isTokenExpired(token)) {
    // Auto logout on expired token
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/auth';
    return;
  }

  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  // Handle unauthorized responses
  if (response.status === 401 || response.status === 403) {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.href = '/auth';
    return;
  }

  return response;
};