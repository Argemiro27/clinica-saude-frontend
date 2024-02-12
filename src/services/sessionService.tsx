
export type SessionToken = string | null;

export const getSessionToken = (): SessionToken => {
  return localStorage.getItem('token');
};

export const isLoggedIn = (): boolean => {
  const token = getSessionToken();
  return !!token; 
};
