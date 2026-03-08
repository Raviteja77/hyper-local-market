// services/web/src/lib/auth/index.ts

// Session management
export {
  saveSession,
  getSession,
  clearSession,
  updateSession,
  isSessionValid,
  refreshSessionExpiry,
  isAuthenticated,
  hasRole,
  hasAnyRole,
  getCurrentUser,
  getCurrentUserId,
  getCurrentUserRole,
  onSessionExpired,
} from "./session";

// Token management
export {
  saveTokens,
  getAccessToken,
  getRefreshToken,
  clearTokens,
  updateAccessToken,
  isTokenValid,
  isTokenExpired,
  getTokenExpiry,
  getTimeUntilExpiry,
  decodeJWT,
  getTokenPayload,
  getUserIdFromToken,
  getUserRoleFromToken,
  shouldRefreshToken,
  canRefreshToken,
  getAuthHeader,
  getBearerToken,
} from "./tokens";
