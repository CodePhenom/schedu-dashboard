import actionNames from './action-names';
import authClient from '../../clients/auth-client';
import firebase from '../../config/firebase-config';

const {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  SET_USER_ADMIN_STATUS,
} = actionNames.auth;

export const register = (input) => async (dispatch) => {
  const { email, password, firstName, lastName } = input;
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await authClient.createUser({
      user: { ...user.user, firstName, lastName },
    });

    dispatch({ type: REGISTER_SUCCESS });
  } catch ({ message }) {
    dispatch({
      type: REGISTER_ERROR,
      payload: { message },
    });
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    dispatch({ type: LOGIN_SUCCESS });
  } catch ({ message }) {
    dispatch({ type: LOGIN_ERROR, payload: { message } });
  }
};

export const setUserAdminStatus = (isAdmin) => async (dispatch) => {
  dispatch({ type: SET_USER_ADMIN_STATUS, payload: { isAdmin } });
};

export const signOut = () => async (dispatch) => {
  try {
    await firebase.auth().signOut();
    localStorage.removeItem('idTokenResult');
    dispatch({ type: SIGNOUT_SUCCESS });
    window.location.assign('/signout');
  } catch ({ message }) {
    dispatch({
      type: SIGNOUT_ERROR,
      payload: { message },
    });
  }
};
