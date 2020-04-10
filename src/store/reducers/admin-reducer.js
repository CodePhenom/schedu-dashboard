import actionNames from './../actions/action-names';

const {
  SEARCH_USER_BY_EMAIL_SUCCESS,
  SEARCH_USER_BY_EMAIL_FAIL,
} = actionNames.admin;

const initState = {
  searchedUser: null,
  adminError: null,
};

const adminReducer = (state = initState, action) => {
  switch (action.type) {
    case SEARCH_USER_BY_EMAIL_SUCCESS:
      return {
        ...state,
        searchedUser: action.data,
      };
    case SEARCH_USER_BY_EMAIL_FAIL:
      return {
        ...state,
        adminError: action.data,
      };
    default:
      return state;
  }
};

export default adminReducer;
