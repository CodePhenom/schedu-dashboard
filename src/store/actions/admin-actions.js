import actionNames from './action-names';
import httpClient from '../../clients/http';

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

export const updateAdminRole = ({ uid, email, isAdmin }) => {
  console.log('isAdmin ', isAdmin);
  return async (dispatch, getState, getFirebase) => {
    // const firebase = getFirebase();
    // const updateAdminRole = firebase
    //   .functions()
    //   .httpsCallable('updateAdminRole');
    try {
      const result = await httpClient.put('/admins/role', {
        uid,
        isAdmin,
      });
      // const { data } = await updateAdminRole({ uid, email, isAdmin });
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

export const updateEnableDisableUser = (data) => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const updateEnableDisableUser = firebase
      .functions()
      .httpsCallable('updateEnableDisableUser');
    try {
      const result = await updateEnableDisableUser(data);
      dispatch({
        type: ENABLE_DISABLE_USER_SUCCESS,
        data: {
          isDisable: data.isDisable,
          message: result.data.message,
        },
      });
    } catch (error) {
      console.log('error ', error);
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
      const { data } = await httpClient.get('/admins');
      dispatch({
        type: FETCH_ADMINS_SUCCESS,
        data: {
          admins: data,
        },
      });
    } catch (error) {
      console.log('error ', error);
      dispatch({
        type: FETCH_ADMINS_FAIL,
        data: {
          errorMessage: 'Could not fetch admins',
        },
      });
    }
  };
};
