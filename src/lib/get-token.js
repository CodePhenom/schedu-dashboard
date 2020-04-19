export const getToken = () => {
  const idTokenResult = JSON.parse(localStorage.getItem('idTokenResult'));
  return idTokenResult ? idTokenResult.token : null;
};
