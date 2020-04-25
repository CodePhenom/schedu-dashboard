import httpClient from './../../../clients/http';
import { getToken } from './../../../lib/get-token';
import * as actionCreators from './action-creators';

export const findUserByEmail = (email) => async (dispatch) => {
  try {
    const { data } = await httpClient.get(
      `/admins/user-by-email?email=${email}`,
      {
        headers: { AuthToken: getToken() },
      }
    );
    dispatch(actionCreators.findUserByEmailSuccess(data));
  } catch ({ message, response }) {
    const { data } = response;
    dispatch(actionCreators.setAdminErrorMessage(data.message || message));
  }
};

export const findUserById = (id) => async (dispatch) => {
  try {
    const { data } = await httpClient.get(`/admins/user-by-id?id=${id}`, {
      headers: { AuthToken: getToken() },
    });
    dispatch(actionCreators.findUserByIdSuccess(data));
  } catch ({ message, response }) {
    const { data } = response;
    dispatch(actionCreators.setAdminErrorMessage(data.message || message));
  }
};

export const updateAdminRole = (input) => async (dispatch) => {
  try {
    await httpClient.put('/admins/role', input, {
      headers: { AuthToken: getToken() },
    });
    dispatch(actionCreators.updateAdminRoleSuccess(input.isAdmin));
  } catch ({ message, response }) {
    const { data } = response;
    dispatch(actionCreators.setAdminErrorMessage(data.message || message));
  }
};

export const updateEnableDisableUser = (input) => async (dispatch) => {
  try {
    await httpClient.put('/admins/users/status', input, {
      headers: { AuthToken: getToken() },
    });
    dispatch(actionCreators.updateEnableDisableUserSuccess(input.isDisabled));
  } catch ({ message, response }) {
    const { data } = response;
    dispatch(actionCreators.setAdminErrorMessage(data.message || message));
  }
};

export const fetchAllAdmins = () => async (dispatch) => {
  try {
    const { data } = await httpClient.get('/admins', {
      headers: { AuthToken: getToken() },
    });
    dispatch(actionCreators.fetchAllAdminsSuccess(data));
  } catch ({ message, response }) {
    const { data } = response;
    dispatch(actionCreators.setAdminErrorMessage(data.message || message));
  }
};

export const adminDeletesUser = (id) => async (dispatch) => {
  try {
    await httpClient.delete(`/admins/users/${id}`, {
      headers: { AuthToken: getToken() },
    });
    dispatch(actionCreators.adminDeletesUserSuccess());
  } catch ({ message, response }) {
    const { data } = response;
    dispatch(actionCreators.setAdminErrorMessage(data.message || message));
  }
};

export const removeAdminErrorMessage = () => (dispatch) => {
  dispatch(actionCreators.removeAdminErrorMessage());
};
