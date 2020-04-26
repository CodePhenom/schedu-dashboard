export const getAuthHeader = () => {
  const idTokenResult = JSON.parse(localStorage.getItem('idTokenResult'));

  return {
    Authorization: `Bearer ${idTokenResult ? idTokenResult.token : null}`,
  };
};
