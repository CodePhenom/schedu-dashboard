import actionNames from './action-names';
import httpClient from './../../clients/http';
import { getToken } from './../../lib/get-token';

const {
  SEARCH_USER_BY_EMAIL_SUCCESS,
  SEARCH_USER_BY_EMAIL_FAIL,
  SEARCH_USER_BY_ID_SUCCESS,
  SEARCH_USER_BY_ID_FAIL,
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

export const findUserByEmail = (email) => async (dispatch) => {
  try {
    const { data } = await httpClient.get(`/users/email/${email}`, {
      headers: { AuthToken: getToken() },
    });
    dispatch({ type: SEARCH_USER_BY_EMAIL_SUCCESS, payload: { data } });
  } catch ({ message }) {
    dispatch({
      type: SEARCH_USER_BY_EMAIL_FAIL,
      payload: { message },
    });
  }
};

export const findUserById = (id) => async (dispatch) => {
  try {
    const { data } = await httpClient.get(`/users/id/${id}`, {
      headers: { AuthToken: getToken() },
    });
    dispatch({ type: SEARCH_USER_BY_ID_SUCCESS, payload: { data } });
  } catch (error) {
    dispatch({ type: SEARCH_USER_BY_ID_FAIL, data: error });
  }
};

export const updateAdminRole = ({ uid, isAdmin }) => async (dispatch) => {
  try {
    const { data } = await httpClient.put(
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
      payload: { data },
    });
  } catch ({ message }) {
    dispatch({
      type: UPDATE_USER_ADMIN_ROLE_FAIL,
      payload: { message },
    });
  }
};

export const updateEnableDisableUser = (input) => async (dispatch) => {
  try {
    const { data } = await httpClient.put('/users/status', input, {
      headers: { AuthToken: getToken() },
    });
    dispatch({
      type: ENABLE_DISABLE_USER_SUCCESS,
      payload: { data },
    });
  } catch ({ message }) {
    dispatch({
      type: ENABLE_DISABLE_USER_FAIL,
      payload: { message },
    });
  }
};

export const removeNotificationMessage = () => (dispatch) => {
  dispatch({ type: REMOVE_NOTIFICATION_MESSAGE });
};

export const fetchAllAdmins = () => async (dispatch) => {
  try {
    const { data } = await httpClient.get('/admins', {
      headers: { AuthToken: getToken() },
    });
    dispatch({
      type: FETCH_ADMINS_SUCCESS,
      payload: { data },
    });
  } catch ({ message }) {
    dispatch({
      type: FETCH_ADMINS_FAIL,
      payload: { message },
    });
  }
};

export const fetchUsersCount = () => async (dispatch) => {
  try {
    const { data } = await httpClient.get('/users/count', {
      headers: { AuthToken: getToken() },
    });
    dispatch({
      type: FETCH_USERS_COUNT_SUCCESS,
      payload: { data },
    });
  } catch ({ message }) {
    dispatch({
      type: FETCH_USERS_COUNT_FAIL,
      payload: { message },
    });
  }
};

export const fetchAdminsCount = () => async (dispatch) => {
  try {
    const { data } = await httpClient.get('/admins/count', {
      headers: { AuthToken: getToken() },
    });
    dispatch({
      type: FETCH_ADMINS_COUNT_SUCCESS,
      payload: { data },
    });
  } catch ({ message }) {
    dispatch({
      type: FETCH_ADMINS_COUNT_FAIL,
      data: { message },
    });
  }
};
