import actionTypes from './action-types';

export const findUserByEmailSuccess = (data) => ({
  type: actionTypes.SEARCH_USER_BY_EMAIL_SUCCESS,
  payload: { data },
});

export const findUserByIdSuccess = (data) => ({
  type: actionTypes.SEARCH_USER_BY_ID_SUCCESS,
  payload: { data },
});

export const updateAdminRoleSuccess = (data) => {
  return {
    type: actionTypes.UPDATE_USER_ADMIN_ROLE_SUCCESS,
    payload: { isAdmin: data },
  };
};

export const updateEnableDisableUserSuccess = (data) => ({
  type: actionTypes.ENABLE_DISABLE_USER_SUCCESS,
  payload: { isDisabled: data },
});

export const fetchAllAdminsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_ADMINS_SUCCESS,
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

export const removeAdminNotificationMessage = () => ({
  type: actionTypes.REMOVE_ADMIN_NOTIFICATION_MESSAGE,
});

export const setAdminNotificationMessage = (message) => ({
  type: actionTypes.SET_ADMIN_NOTIFICATION_MESSAGE,
  payload: { message },
});
