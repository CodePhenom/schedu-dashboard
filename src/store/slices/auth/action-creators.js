import actionTypes from './action-types';

export const registerSuccess = () => ({ type: actionTypes.REGISTER_SUCCESS });

export const loginSuccess = () => ({ type: actionTypes.LOGIN_SUCCESS });

export const signoutSuccess = () => ({ type: actionTypes.SIGNOUT_SUCCESS });

export const setUserAdminStatus = (isAdmin) => ({
  type: actionTypes.SET_USER_ADMIN_STATUS,
  payload: { isAdmin },
});

export const authError = (message) => ({
  type: actionTypes.AUTH_ERROR,
  paylaod: { message },
});
