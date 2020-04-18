const auth = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_ERROR: 'LOGIN_ERROR',
  SIGNOUT_SUCCESS: 'SIGNOUT_SUCCESS',
  REGISTER_SUCCESS: 'REGISTER_SUCCESS',
  REGISTER_ERROR: 'REGISTER_ERROR',
  SET_USER_ADMIN_STATUS: 'SET_USER_ADMIN_STATUS',
};

const admin = {
  SEARCH_USER_BY_EMAIL_SUCCESS: 'SEARCH_USER_BY_EMAIL_SUCCESS',
  SEARCH_USER_BY_EMAIL_FAIL: 'SEARCH_USER_BY_EMAIL_FAIL',
  UPDATE_USER_ADMIN_ROLE_SUCCESS: 'UPDATE_USER_ADMIN_ROLE_SUCCESS',
  UPDATE_USER_ADMIN_ROLE_FAIL: 'UPDATE_USER_ADMIN_ROLE_FAIL',
  ENABLE_DISABLE_USER_SUCCESS: 'ENABLE_DISABLE_USER_SUCCESS',
  ENABLE_DISABLE_USER_FAIL: 'ENABLE_DISABLE_USER_FAIL',
  REMOVE_NOTIFICATION_MESSAGE: 'REMOVE_NOTIFICATION_MESSAGE',
  FETCH_ADMINS_SUCCESS: 'FETCH_ADMINS_SUCCESS',
  FETCH_ADMINS_FAIL: 'FETCH_ADMINS_FAIL',
};

const theme = {
  CHANGE_TO_DARK_THEME: 'CHANGE_TO_DARK_THEME',
  CHANGE_TO_LIGHT_THEME: 'CHANGE_TO_LIGHT_THEME',
};

const actionNames = {
  auth,
  admin,
  theme,
};

export default actionNames;
