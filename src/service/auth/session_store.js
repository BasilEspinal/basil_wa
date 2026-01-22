// src/service/auth/session_store.js
export const SESSION_KEYS = {
  token: 'accessSessionToken',
  user: 'accessSessionUser',
};

export function setSession({ token, user }) {
  sessionStorage.setItem(SESSION_KEYS.token, token);
  sessionStorage.setItem(SESSION_KEYS.user, user);

  // opcional: persistencia
  localStorage.setItem(SESSION_KEYS.token, token);
  localStorage.setItem(SESSION_KEYS.user, user);
}

export function clearSession() {
  sessionStorage.removeItem(SESSION_KEYS.token);
  sessionStorage.removeItem(SESSION_KEYS.user);

  localStorage.removeItem(SESSION_KEYS.token);
  localStorage.removeItem(SESSION_KEYS.user);
}

export function getSessionToken() {
  return sessionStorage.getItem(SESSION_KEYS.token) || localStorage.getItem(SESSION_KEYS.token) || '';
}
