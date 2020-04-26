import httpClient from './../../../clients/http';
import { getAuthHeader } from './../../../lib/get-token';
import * as actionCreators from './action-creators';
import * as notificationMessages from '../../constants/messages';

export const findUserByEmail = (email) => async (dispatch) => {
  try {
    const { data } = await httpClient.get(
      `/admins/user-by-email?email=${email}`,
      {
        headers: { ...getAuthHeader() },
      }
    );
    dispatch(actionCreators.findUserByEmailSuccess(data));
  } catch ({ message, response }) {
    let errorMessage = response ? response.data.message : message;
    dispatch(actionCreators.setAdminErrorMessage(errorMessage));
  }
};

export const findUserById = (id) => async (dispatch) => {
  try {
    const { data } = await httpClient.get(`/admins/user-by-id?id=${id}`, {
      headers: { ...getAuthHeader() },
    });
    dispatch(actionCreators.findUserByIdSuccess(data));
  } catch ({ message, response }) {
    let errorMessage = response ? response.data.message : message;
    dispatch(actionCreators.setAdminErrorMessage(errorMessage));
  }
};

export const updateAdminRole = (input) => async (dispatch) => {
  try {
    await httpClient.put('/admins/role', input, {
      headers: { ...getAuthHeader() },
    });
    dispatch(actionCreators.updateAdminRoleSuccess(input.isAdmin));
    const messageType = input.isAdmin ? 'promoted' : 'depromoted';
    dispatch(
      actionCreators.setAdminNotificationMessage(
        notificationMessages.adminRoleUpdate[messageType]
      )
    );
  } catch ({ message, response }) {
    let errorMessage = response ? response.data.message : message;
    dispatch(actionCreators.setAdminErrorMessage(errorMessage));
  }
};

export const updateEnableDisableUser = (input) => async (dispatch) => {
  try {
    await httpClient.put('/admins/users/status', input, {
      headers: { ...getAuthHeader() },
    });
    dispatch(actionCreators.updateEnableDisableUserSuccess(input.isDisabled));
  } catch ({ message, response }) {
    let errorMessage = response ? response.data.message : message;
    dispatch(actionCreators.setAdminErrorMessage(errorMessage));
  }
};

export const fetchAllAdmins = () => async (dispatch) => {
  try {
    const { data } = await httpClient.get('/admins', {
      headers: { ...getAuthHeader() },
    });
    dispatch(actionCreators.fetchAllAdminsSuccess(data));
  } catch ({ message, response }) {
    let errorMessage = response ? response.data.message : message;
    dispatch(actionCreators.setAdminErrorMessage(errorMessage));
  }
};

export const adminDeletesUser = (id) => async (dispatch) => {
  try {
    await httpClient.delete(`/admins/users/${id}`, {
      headers: { ...getAuthHeader() },
    });
    dispatch(actionCreators.adminDeletesUserSuccess());
    dispatch(
      actionCreators.setAdminNotificationMessage(
        notificationMessages.adminDeletedUser
      )
    );
  } catch ({ message, response }) {
    let errorMessage = response ? response.data.message : message;
    dispatch(actionCreators.setAdminErrorMessage(errorMessage));
  }
};

export const removeAdminErrorMessage = () => (dispatch) => {
  dispatch(actionCreators.removeAdminErrorMessage());
};

export const removeAdminNotificationMessage = () => (dispatch) => {
  dispatch(actionCreators.removeAdminNotificationMessage());
};
