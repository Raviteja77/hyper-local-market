// services/web/src/lib/auth/tokens.ts

const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const TOKEN_EXPIRY_KEY = 'token_expiry';

// ============================================
// TOKEN STORAGE
// ============================================

export const saveTokens = (accessToken: string, refreshToken: string, expiresIn: number = 3600): void => {
  if (typeof window === 'undefined') return;

  try {
    const expiryTime = Date.now() + expiresIn * 1000; // Convert seconds to milliseconds
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
  } catch (error) {
    console.error('Failed to save tokens:', error);
  }
};

export const getAccessToken = (): string | null => {
  if (typeof window === 'undefined') return null;

  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch (error) {
    console.error('Failed to get access token:', error);
    return null;
  }
};

export const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;

  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  } catch (error) {
    console.error('Failed to get refresh token:', error);
    return null;
  }
};

export const clearTokens = (): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(TOKEN_EXPIRY_KEY);
  } catch (error) {
    console.error('Failed to clear tokens:', error);
  }
};

export const updateAccessToken = (accessToken: string, expiresIn: number = 3600): void => {
  if (typeof window === 'undefined') return;

  try {
    const expiryTime = Date.now() + expiresIn * 1000;
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toString());
  } catch (error) {
    console.error('Failed to update access token:', error);
  }
};

// ============================================
// TOKEN VALIDATION
// ============================================

export const isTokenValid = (): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);

    if (!accessToken || !expiryTime) {
      return false;
    }

    // Check if token has expired (with 5 minute buffer)
    const bufferTime = 5 * 60 * 1000; // 5 minutes
    return Date.now() < parseInt(expiryTime) - bufferTime;
  } catch (error) {
    console.error('Failed to check token validity:', error);
    return false;
  }
};

export const isTokenExpired = (): boolean => {
  return !isTokenValid();
};

export const getTokenExpiry = (): number | null => {
  if (typeof window === 'undefined') return null;

  try {
    const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
    return expiryTime ? parseInt(expiryTime) : null;
  } catch (error) {
    console.error('Failed to get token expiry:', error);
    return null;
  }
};

export const getTimeUntilExpiry = (): number => {
  const expiry = getTokenExpiry();
  if (!expiry) return 0;

  const timeLeft = expiry - Date.now();
  return Math.max(0, timeLeft);
};

// ============================================
// JWT HELPERS
// ============================================

export const decodeJWT = (token: string): any => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Failed to decode JWT:', error);
    return null;
  }
};

export const getTokenPayload = (): any => {
  const token = getAccessToken();
  if (!token) return null;
  return decodeJWT(token);
};

export const getUserIdFromToken = (): string | null => {
  const payload = getTokenPayload();
  return payload?.user_id || payload?.sub || null;
};

export const getUserRoleFromToken = (): string | null => {
  const payload = getTokenPayload();
  return payload?.role || null;
};

// ============================================
// TOKEN REFRESH HELPERS
// ============================================

export const shouldRefreshToken = (): boolean => {
  const timeLeft = getTimeUntilExpiry();
  const fiveMinutes = 5 * 60 * 1000;
  
  // Refresh if less than 5 minutes until expiry
  return timeLeft > 0 && timeLeft < fiveMinutes;
};

export const canRefreshToken = (): boolean => {
  const refreshToken = getRefreshToken();
  return refreshToken !== null;
};

// ============================================
// AUTHORIZATION HEADER
// ============================================

export const getAuthHeader = (): { Authorization: string } | {} => {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getBearerToken = (): string | null => {
  const token = getAccessToken();
  return token ? `Bearer ${token}` : null;
};