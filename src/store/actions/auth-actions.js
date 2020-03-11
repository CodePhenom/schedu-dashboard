import actionNames from './action-names';

const { LOGIN_SUCCESS, LOGIN_ERROR } = actionNames.auth;

export const login = ({ email, password }) => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    console.log('firebase ', firebase);

    try {
      await firebase.login({ email, password });
      dispatch({ type: LOGIN_SUCCESS });
    } catch (error) {
      console.log('error ', error);
      dispatch({ type: LOGIN_ERROR, error });
    }
  };
};
