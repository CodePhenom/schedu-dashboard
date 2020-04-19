import actionNames from './../actions/action-names';

const {
  SEARCH_USER_BY_EMAIL_SUCCESS,
  SEARCH_USER_BY_EMAIL_FAIL,
  ENABLE_DISABLE_USER_SUCCESS,
  ENABLE_DISABLE_USER_FAIL,
  UPDATE_USER_ADMIN_ROLE_SUCCESS,
  UPDATE_USER_ADMIN_ROLE_FAIL,
  REMOVE_NOTIFICATION_MESSAGE,
  FETCH_ADMINS_SUCCESS,
  FETCH_ADMINS_FAIL,
  FETCH_USERS_COUNT_SUCCESS,
  FETCH_USERS_COUNT_FAIL,
  FETCH_ADMINS_COUNT_SUCCESS,
  FETCH_ADMINS_COUNT_FAIL,
} = actionNames.admin;

const initState = {
  searchedUser: null,
  admins: [],
  adminError: null,
  notificationMessage: null,
  usersCount: null,
  adminsCount: null,
};

const adminReducer = (state = initState, action) => {
  switch (action.type) {
    case SEARCH_USER_BY_EMAIL_SUCCESS:
      return {
        ...state,
        searchedUser: action.data,
      };
    case FETCH_USERS_COUNT_SUCCESS:
      return {
        ...state,
        usersCount: action.data,
      };
    case FETCH_ADMINS_COUNT_SUCCESS:
      return {
        ...state,
        adminsCount: action.data,
      };
    case SEARCH_USER_BY_EMAIL_FAIL:
      return {
        ...state,
        adminError: action.data,
      };
    case ENABLE_DISABLE_USER_SUCCESS:
      return {
        ...state,
        notificationMessage: action.data.message,
        searchedUser: {
          ...state.searchedUser,
          disabled: action.data.isDisable,
        },
      };
    case ENABLE_DISABLE_USER_FAIL:
    case FETCH_USERS_COUNT_FAIL:
    case FETCH_ADMINS_COUNT_FAIL:
      return {
        ...state,
        adminError: action.data.errorMessage,
      };
    case UPDATE_USER_ADMIN_ROLE_SUCCESS:
      return {
        ...state,
        notificationMessage: action.data.message,
        searchedUser: action.data,
      };
    case UPDATE_USER_ADMIN_ROLE_FAIL:
      return {
        ...state,
        adminError: action.data.errorMessage,
      };
    case REMOVE_NOTIFICATION_MESSAGE:
      return {
        ...state,
        notificationMessage: null,
      };
    case FETCH_ADMINS_SUCCESS:
      return {
        ...state,
        admins: action.data.admins,
      };
    case FETCH_ADMINS_FAIL:
      return {
        ...state,
        notificationMessage: action.data.errorMessage,
      };
    default:
      return state;
  }
};

export default adminReducer;
