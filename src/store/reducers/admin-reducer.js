import actionNames from './../actions/action-names';

const {
  SEARCH_USER_BY_EMAIL_SUCCESS,
  SEARCH_USER_BY_EMAIL_FAIL,
  SEARCH_USER_BY_ID_SUCCESS,
  SEARCH_USER_BY_ID_FAIL,
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

const adminReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SEARCH_USER_BY_EMAIL_SUCCESS:
      return {
        ...state,
        searchedUser: payload.data,
      };
    case SEARCH_USER_BY_ID_SUCCESS:
      return {
        ...state,
        searchedUser: payload.data,
      };
    case UPDATE_USER_ADMIN_ROLE_SUCCESS:
      return {
        ...state,
        notificationMessage: 'Updated admin role',
        searchedUser: payload.data,
      };
    case ENABLE_DISABLE_USER_SUCCESS:
      return {
        ...state,
        notificationMessage: 'Updated user status',
        searchedUser: payload.data,
      };
    case REMOVE_NOTIFICATION_MESSAGE:
      return {
        ...state,
        notificationMessage: null,
      };
    case FETCH_ADMINS_SUCCESS:
      return {
        ...state,
        admins: payload.data,
      };
    case FETCH_USERS_COUNT_SUCCESS:
      return {
        ...state,
        usersCount: payload.data,
      };
    case FETCH_ADMINS_COUNT_SUCCESS:
      return {
        ...state,
        adminsCount: payload.data,
      };
    case SEARCH_USER_BY_EMAIL_FAIL:
    case SEARCH_USER_BY_ID_FAIL:
    case UPDATE_USER_ADMIN_ROLE_FAIL:
    case ENABLE_DISABLE_USER_FAIL:
    case FETCH_ADMINS_FAIL:
    case FETCH_USERS_COUNT_FAIL:
    case FETCH_ADMINS_COUNT_FAIL:
      return {
        ...state,
        adminError: payload.message,
      };
    default:
      return state;
  }
};

export default adminReducer;
