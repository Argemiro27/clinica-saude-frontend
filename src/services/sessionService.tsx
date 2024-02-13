export type SessionToken = string | null;

export const getSessionToken = (): SessionToken => {
  const userDataString = localStorage.getItem('userData');
  if (userDataString) {
    const userData = JSON.parse(userDataString);
    return userData.token || null;
  }
  return null;
};

export const isLoggedIn = (): boolean => {
  const token = getSessionToken();
  return !!token; 
};
