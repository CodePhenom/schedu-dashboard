import actionNames from './../actions/action-names';

const {
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_ERROR,
} = actionNames.auth;

const initState = {
  authError: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case REGISTER_ERROR:
      return {
        ...state,
        authError: action.error.message,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        authError: action.error.message,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        authError: null,
      };
    case SIGNOUT_SUCCESS:
      return state;
    default:
      return state;
  }
};

export default authReducer;
