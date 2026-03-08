// services/web/src/lib/auth/session.ts
import { User, UserRole } from '@/types';

const SESSION_KEY = 'user_session';
const SESSION_EXPIRY_KEY = 'session_expiry';

// ============================================
// SESSION STORAGE
// ============================================

export const saveSession = (user: User, expiresIn: number = 24 * 60 * 60 * 1000): void => {
  if (typeof window === 'undefined') return;

  try {
    const expiryTime = Date.now() + expiresIn;
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    localStorage.setItem(SESSION_EXPIRY_KEY, expiryTime.toString());
  } catch (error) {
    console.error('Failed to save session:', error);
  }
};

export const getSession = (): User | null => {
  if (typeof window === 'undefined') return null;

  try {
    const sessionData = localStorage.getItem(SESSION_KEY);
    const expiryTime = localStorage.getItem(SESSION_EXPIRY_KEY);

    if (!sessionData || !expiryTime) {
      return null;
    }

    // Check if session has expired
    if (Date.now() > parseInt(expiryTime)) {
      clearSession();
      return null;
    }

    return JSON.parse(sessionData);
  } catch (error) {
    console.error('Failed to get session:', error);
    return null;
  }
};

export const clearSession = (): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_EXPIRY_KEY);
  } catch (error) {
    console.error('Failed to clear session:', error);
  }
};

export const updateSession = (updates: Partial<User>): void => {
  const currentSession = getSession();
  if (!currentSession) return;

  const updatedSession = { ...currentSession, ...updates };
  saveSession(updatedSession);
};

export const isSessionValid = (): boolean => {
  if (typeof window === 'undefined') return false;

  try {
    const expiryTime = localStorage.getItem(SESSION_EXPIRY_KEY);
    if (!expiryTime) return false;

    return Date.now() < parseInt(expiryTime);
  } catch (error) {
    console.error('Failed to check session validity:', error);
    return false;
  }
};

export const refreshSessionExpiry = (expiresIn: number = 24 * 60 * 60 * 1000): void => {
  if (typeof window === 'undefined') return;

  try {
    const expiryTime = Date.now() + expiresIn;
    localStorage.setItem(SESSION_EXPIRY_KEY, expiryTime.toString());
  } catch (error) {
    console.error('Failed to refresh session expiry:', error);
  }
};

// ============================================
// SESSION CHECKS
// ============================================

export const isAuthenticated = (): boolean => {
  return getSession() !== null && isSessionValid();
};

export const hasRole = (requiredRole: UserRole): boolean => {
  const session = getSession();
  return session?.role === requiredRole;
};

export const hasAnyRole = (requiredRoles: UserRole[]): boolean => {
  const session = getSession();
  return session ? requiredRoles.includes(session.role) : false;
};

export const getCurrentUser = (): User | null => {
  return getSession();
};

export const getCurrentUserId = (): string | null => {
  const session = getSession();
  return session?.id || null;
};

export const getCurrentUserRole = (): UserRole | null => {
  const session = getSession();
  return session?.role || null;
};

// ============================================
// SESSION EVENTS
// ============================================

export const onSessionExpired = (callback: () => void): void => {
  if (typeof window === 'undefined') return;

  // Check session validity periodically
  const intervalId = setInterval(() => {
    if (!isSessionValid()) {
      clearSession();
      callback();
      clearInterval(intervalId);
    }
  }, 60000); // Check every minute

  // Cleanup on unmount
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', () => {
      clearInterval(intervalId);
    });
  }
};