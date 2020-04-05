import actionNames from './action-names';

const {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT_SUCCESS,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
} = actionNames.auth;

export const register = ({ email, password }) => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();

    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      dispatch({ type: REGISTER_SUCCESS });
    } catch (error) {
      dispatch({ type: REGISTER_ERROR, error });
    }
  };
};

export const login = ({ email, password }) => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      dispatch({ type: LOGIN_SUCCESS });
    } catch (error) {
      dispatch({ type: LOGIN_ERROR, error });
    }
  };
};

export const signOut = () => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    try {
      await firebase.auth().signOut();
      dispatch({ type: SIGNOUT_SUCCESS });
    } catch (error) {
      console.log(error);
    }
  };
};
