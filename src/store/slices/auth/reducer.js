import actionTypes from './action-types';

const initState = {
  authError: null,
  isAdmin: false,
};

const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case actionTypes.SET_USER_ADMIN_STATUS:
      return {
        ...state,
        isAdmin: payload.isAdmin,
      };
    case actionTypes.SIGNOUT_SUCCESS:
      return { ...state, isAdmin: false };
    case actionTypes.SIGNOUT_ERROR:
    case actionTypes.REGISTER_ERROR:
    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        authError: payload.message,
      };
    default:
      return state;
  }
};

export default authReducer;
