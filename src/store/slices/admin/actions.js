import httpClient from './../../../clients/http';
import { getToken } from './../../../lib/get-token';
import * as actionCreators from './action-creators';

export const findUserByEmail = (email) => async (dispatch) => {
  try {
    const { data } = await httpClient.get(`/admins/users/email/${email}`, {
      headers: { AuthToken: getToken() },
    });
    dispatch(actionCreators.findUserByEmailSuccess(data));
  } catch ({ message }) {
    dispatch(actionCreators.httpError(message));
  }
};

export const findUserById = (id) => async (dispatch) => {
  try {
    const { data } = await httpClient.get(`/admins/users/${id}`, {
      headers: { AuthToken: getToken() },
    });
    dispatch(actionCreators.findUserByIdSuccess(data));
  } catch ({ message }) {
    dispatch(actionCreators.httpError(message));
  }
};

export const updateAdminRole = (input) => async (dispatch) => {
  try {
    const { data } = await httpClient.put('/admins/role', input, {
      headers: { AuthToken: getToken() },
    });
    dispatch(actionCreators.updateAdminRoleSuccess(data));
  } catch ({ message }) {
    dispatch(actionCreators.httpError(message));
  }
};

export const updateEnableDisableUser = (input) => async (dispatch) => {
  try {
    const { data } = await httpClient.put('/admins/users/status', input, {
      headers: { AuthToken: getToken() },
    });
    dispatch(actionCreators.updateEnableDisableUserSuccess(data));
  } catch ({ message }) {
    dispatch(actionCreators.httpError(message));
  }
};

export const fetchAllAdmins = () => async (dispatch) => {
  try {
    const { data } = await httpClient.get('/admins', {
      headers: { AuthToken: getToken() },
    });
    dispatch(actionCreators.fetchAllAdminsSuccess(data));
  } catch ({ message }) {
    dispatch(actionCreators.httpError(message));
  }
};

export const fetchUsersCount = () => async (dispatch) => {
  try {
    const { data } = await httpClient.get('/admins/users/count', {
      headers: { AuthToken: getToken() },
    });
    dispatch(actionCreators.fetchUsersCountSuccess(data));
  } catch ({ message }) {
    dispatch(actionCreators.httpError());
  }
};

export const fetchAdminsCount = () => async (dispatch) => {
  try {
    const { data } = await httpClient.get('/admins/count', {
      headers: { AuthToken: getToken() },
    });
    dispatch(actionCreators.fetchAdminsCountSuccess(data));
  } catch ({ message }) {
    dispatch(actionCreators.httpError());
  }
};

export const adminDeletesUser = (id) => async (dispatch) => {
  try {
    await httpClient.delete(`/admins/users/${id}`, {
      headers: { AuthToken: getToken() },
    });
    dispatch(actionCreators.adminDeletesUserSuccess());
  } catch ({ message }) {
    dispatch(actionCreators.httpError());
  }
};

export const removeNotificationMessage = () => (dispatch) => {
  dispatch(actionCreators.removeNotificationMessage());
};
