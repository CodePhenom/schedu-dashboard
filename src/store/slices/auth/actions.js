import authClient from '../../../clients/auth-client';
import firebase from '../../../config/firebase-config';
import * as actionCreators from './action-creators';

export const register = (input) => async (dispatch) => {
  const { email, password, firstName, lastName } = input;
  try {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await authClient.createUser({
      user: { ...user.user, firstName, lastName },
    });

    dispatch(actionCreators.registerSuccess());
  } catch ({ message }) {
    dispatch(actionCreators.authError(message));
  }
};

export const login = ({ email, password }) => async (dispatch) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    dispatch(actionCreators.loginSuccess());
  } catch ({ message }) {
    dispatch(actionCreators.authError(message));
  }
};

export const setUserAdminStatus = (isAdmin) => async (dispatch) => {
  dispatch(actionCreators.setUserAdminStatus(isAdmin));
};

export const signOut = () => async (dispatch) => {
  try {
    await firebase.auth().signOut();
    localStorage.removeItem('idTokenResult');
    dispatch(actionCreators.signoutSuccess());
    window.location.assign('/signout');
  } catch ({ message }) {
    dispatch(actionCreators.authError(message));
  }
};
