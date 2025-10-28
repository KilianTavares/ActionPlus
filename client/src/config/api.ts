export const API_BASE_URL = process.env.NEXT_PUBLIC_AWS_APIGATEWAY_URL_dev || 'https://31d8b74eg4.execute-api.ap-southeast-2.amazonaws.com/dev';

export const API_ENDPOINTS = {
  signup: `${API_BASE_URL}/signup`,
  login: `${API_BASE_URL}/login`,
  contact: `${API_BASE_URL}/contact`,
  profile: `${API_BASE_URL}/profile`,
};