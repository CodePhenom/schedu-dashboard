import actionNames from './action-names';
import httpClient from '../../clients/http';

const {
  SEARCH_USER_BY_EMAIL_SUCCESS,
  SEARCH_USER_BY_EMAIL_FAIL,
  SET_USER_ADMIN_STATUS,
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

export const setUserAdminStatus = (isAdmin) => {
  return async (dispatch) => {
    dispatch({ type: SET_USER_ADMIN_STATUS, isAdmin });
  };
};

export const updateAdminRole = ({ uid, email, isAdmin }) => {
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();
    const updateAdminRole = firebase
      .functions()
      .httpsCallable('updateAdminRole');
    try {
      const { data } = await updateAdminRole({ uid, email, isAdmin });
      dispatch({
        type: UPDATE_USER_ADMIN_ROLE_SUCCESS,
        data,
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

export const fetchAllAdmins = (accessToken) => {
  console.log('accessToken actions', accessToken);
  return async (dispatch, getState, getFirebase) => {
    const firebase = getFirebase();

    // const fetchAllAdmins = firebase.functions().httpsCallable('fetchAllAdmins');
    try {
      const res = await httpClient.get('/admins', {
        headers: {
          AuthToken: accessToken,
        },
      });
      console.log('res ', res);
      // const result = await fetchAllAdmins();
      // console.log('result ', result);
      // dispatch({
      //   type: FETCH_ADMINS_SUCCESS,
      //   data: {
      //     isDisable: data.isDisable,
      //     message: result.data.message,
      //   },
      // });
    } catch (error) {
      console.log('error ', error);
      // dispatch({
      //   type: ENABLE_DISABLE_USER_FAIL,
      //   data: {
      //     errorMessage: 'Unable to do the action',
      //   },
      // });
    }
  };
};
