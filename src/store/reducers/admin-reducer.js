import actionNames from './../actions/action-names';
import { v4 as uuidv4 } from 'uuid';

const {
  SEARCH_USER_BY_EMAIL_SUCCESS,
  SEARCH_USER_BY_EMAIL_FAIL,
  SET_USER_ADMIN_STATUS,
  ENABLE_DISABLE_USER_SUCCESS,
  ENABLE_DISABLE_USER_FAIL,
  UPDATE_USER_ADMIN_ROLE_SUCCESS,
  UPDATE_USER_ADMIN_ROLE_FAIL,
  REMOVE_NOTIFICATION_MESSAGE,
} = actionNames.admin;

const initState = {
  isAdmin: false,
  searchedUser: null,
  adminError: null,
  notificationMessage: null,
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
    case SET_USER_ADMIN_STATUS:
      return {
        ...state,
        isAdmin: action.isAdmin,
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
      return {
        ...state,
        adminError: action.data.errorMessage,
      };
    case UPDATE_USER_ADMIN_ROLE_SUCCESS:
      return {
        ...state,
        notificationMessage: action.data.message,
        searchedUser: action.data.user,
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
    default:
      return state;
  }
};

export default adminReducer;