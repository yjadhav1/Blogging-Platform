// AuthService.js

// Function to set the JWT token to localStorage
export const setAuthToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Function to retrieve the JWT token from localStorage
export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Function to remove the JWT token from localStorage
export const removeAuthToken = () => {
  localStorage.removeItem('authToken');
};

// Function to check if the user is authenticated (valid token)
export const isAuthenticated = () => {
  const token = getAuthToken();
  // Add logic to verify the token (e.g., token expiration, signature validation)
  return !!token; // Return true if token exists, else false
};
