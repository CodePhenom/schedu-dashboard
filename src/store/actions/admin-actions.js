import actionNames from './action-names';
import httpClient from './../../clients/http';
import { getToken } from './../../lib/get-token';

const {
  SEARCH_USER_BY_EMAIL_SUCCESS,
  SEARCH_USER_BY_EMAIL_FAIL,
  UPDATE_USER_ADMIN_ROLE_SUCCESS,
  UPDATE_USER_ADMIN_ROLE_FAIL,
  ENABLE_DISABLE_USER_SUCCESS,
  ENABLE_DISABLE_USER_FAIL,
  REMOVE_NOTIFICATION_MESSAGE,
  FETCH_ADMINS_SUCCESS,
  FETCH_ADMINS_FAIL,
  FETCH_USERS_COUNT_SUCCESS,
  FETCH_USERS_COUNT_FAIL,
  FETCH_ADMINS_COUNT_SUCCESS,
  FETCH_ADMINS_COUNT_FAIL,
} = actionNames.admin;

export const findUserByEmail = (email) => {
  return async (dispatch) => {
    try {
      const { data } = await httpClient.get(`/users/email/${email}`, {
        headers: { AuthToken: getToken() },
      });
      console.log('data ', data);
      dispatch({ type: SEARCH_USER_BY_EMAIL_SUCCESS, data });
    } catch (error) {
      dispatch({ type: SEARCH_USER_BY_EMAIL_FAIL, data: error });
    }
  };
};

export const updateAdminRole = ({ uid, email, isAdmin }) => {
  return async (dispatch) => {
    try {
      const result = await httpClient.put(
        '/admins/role',
        {
          uid,
          isAdmin,
        },
        {
          headers: { AuthToken: getToken() },
        }
      );
      dispatch({
        type: UPDATE_USER_ADMIN_ROLE_SUCCESS,
        data: result.data,
      });
    } catch (error) {
      console.log('error ', error);
      dispatch({
        type: UPDATE_USER_ADMIN_ROLE_FAIL,
        data: {
          errorMessage: 'Unable to do this action',
        },
      });
    }
  };
};

export const updateEnableDisableUser = (input) => {
  return async (dispatch) => {
    try {
      const { data } = await httpClient.put('/users/status', input, {
        headers: { AuthToken: getToken() },
      });
      dispatch({
        type: ENABLE_DISABLE_USER_SUCCESS,
        data: {
          isDisable: input.isDisable,
          message: data,
        },
      });
    } catch (error) {
      dispatch({
        type: ENABLE_DISABLE_USER_FAIL,
        data: {
          errorMessage: 'Unable to do the action',
        },
      });
    }
  };
};

export const removeNotificationMessage = (id) => {
  return (dispatch) => {
    dispatch({ type: REMOVE_NOTIFICATION_MESSAGE, data: { id } });
  };
};

export const fetchAllAdmins = () => {
  return async (dispatch) => {
    try {
      const { data } = await httpClient.get('/admins', {
        headers: { AuthToken: getToken() },
      });
      dispatch({
        type: FETCH_ADMINS_SUCCESS,
        data: {
          admins: data,
        },
      });
    } catch (error) {
      dispatch({
        type: FETCH_ADMINS_FAIL,
        data: {
          errorMessage: 'Could not fetch admins',
        },
      });
    }
  };
};

export const fetchUsersCount = () => {
  return async (dispatch) => {
    try {
      const { data } = await httpClient.get('/users/count', {
        headers: { AuthToken: getToken() },
      });
      dispatch({
        type: FETCH_USERS_COUNT_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_USERS_COUNT_FAIL,
        data: {
          errorMessage: 'Could not fetch users count',
        },
      });
    }
  };
};

export const fetchAdminsCount = () => {
  return async (dispatch) => {
    try {
      const { data } = await httpClient.get('/admins/count', {
        headers: { AuthToken: getToken() },
      });
      dispatch({
        type: FETCH_ADMINS_COUNT_SUCCESS,
        data,
      });
    } catch (error) {
      dispatch({
        type: FETCH_ADMINS_COUNT_FAIL,
        data: {
          errorMessage: 'Could not fetch admins count',
        },
      });
    }
  };
};
