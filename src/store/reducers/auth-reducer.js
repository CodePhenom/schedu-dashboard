import actionNames from './../actions/action-names';

const {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERROR,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  SET_USER_ADMIN_STATUS,
} = actionNames.auth;

const initState = {
  authError: null,
  isAdmin: false,
};

const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case SET_USER_ADMIN_STATUS:
      return {
        ...state,
        isAdmin: payload.isAdmin,
      };
    case SIGNOUT_SUCCESS:
      return { ...state, isAdmin: false };
    case SIGNOUT_ERROR:
    case REGISTER_ERROR:
    case LOGIN_ERROR:
      return {
        ...state,
        authError: payload.message,
      };
    default:
      return state;
  }
};

export default authReducer;
