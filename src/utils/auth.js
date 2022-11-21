export const getUser = () => {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  }
  return null;
}

export const getAccessToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    return accessToken
  }
  return null;
}