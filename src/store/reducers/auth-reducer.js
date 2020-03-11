import actionNames from './../actions/action-names';

const { LOGIN_SUCCESS, LOGIN_ERROR } = actionNames.auth;

const initState = {};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_ERROR:
      console.log('LOGIN_ERROR', action);
      return {
        ...state,
        authError: action.error.message
      };
    case LOGIN_SUCCESS:
      console.log('LOGIN_SUCCESS');
      return {
        ...state,
        authError: null
      };
    default:
      return state;
  }
};

export default authReducer;
