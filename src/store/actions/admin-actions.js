import actionNames from './action-names';

const {
  SEARCH_USER_BY_EMAIL_SUCCESS,
  SEARCH_USER_BY_EMAIL_FAIL,
} = actionNames.admin;

export const findUserByEmail = (email) => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const findUserByEmail = firebase
      .functions()
      .httpsCallable('findUserByEmail');
    try {
      const user = await findUserByEmail({ email });
      dispatch({ type: SEARCH_USER_BY_EMAIL_SUCCESS, data: user.data });
    } catch (error) {
      dispatch({ type: SEARCH_USER_BY_EMAIL_FAIL, data: error });
    }
  };
};
