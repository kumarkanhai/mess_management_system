// Determine API base URL based on environment
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.DEV ? 'https://mess-management-system-back.onrender.com' : '');

export default API_BASE_URL;
