import actionTypes from './action-types';

export const findUserByEmailSuccess = (data) => ({
  type: actionTypes.SEARCH_USER_BY_EMAIL_SUCCESS,
  payload: { data },
});

export const findUserByIdSuccess = (data) => ({
  type: actionTypes.SEARCH_USER_BY_ID_SUCCESS,
  payload: { data },
});

export const updateAdminRoleSuccess = (data) => ({
  type: actionTypes.UPDATE_USER_ADMIN_ROLE_SUCCESS,
  payload: { data },
});

export const updateEnableDisableUserSuccess = (data) => ({
  type: actionTypes.ENABLE_DISABLE_USER_SUCCESS,
  payload: { data },
});

export const fetchAllAdminsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_ADMINS_SUCCESS,
  payload: { data },
});

export const fetchUsersCountSuccess = (data) => ({
  type: actionTypes.FETCH_USERS_COUNT_SUCCESS,
  payload: { data },
});

export const fetchAdminsCountSuccess = (data) => ({
  type: actionTypes.FETCH_ADMINS_COUNT_SUCCESS,
  payload: { data },
});

export const adminDeletesUserSuccess = () => ({
  type: actionTypes.ADMIN_DELETES_USER_SUCCESS,
});

export const removeAdminErrorMessage = () => ({
  type: actionTypes.REMOVE_ADMIN_ERROR_MESSAGE,
});

export const setAdminErrorMessage = (message) => ({
  type: actionTypes.SET_ADMIN_ERROR_MESSAGE,
  payload: { message },
});
