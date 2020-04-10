import actionNames from './action-names';

const {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT_SUCCESS,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  SET_USER_ADMIN_STATUS,
} = actionNames.auth;

export const register = ({ email, password, firstName, lastName }) => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const db = firebase.firestore();

    try {
      const user = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      await db.collection('users').doc(user.user.uid).set({
        firstName,
        lastName,
      });
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

export const setUserAdminStatus = (isAdmin) => {
  return async (dispatch) => {
    dispatch({ type: SET_USER_ADMIN_STATUS, isAdmin });
  };
};

export const addAdmin = (email) => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const addAdminRole = firebase.functions().httpsCallable('addAdminRole');
    await addAdminRole({ email });
  };
};
