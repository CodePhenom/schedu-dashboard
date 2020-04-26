import actionTypes from './action-types';

const initState = {
  searchedUser: null,
  admins: [],
  errorMessage: null,
  notificationMessage: null,
  usersCount: null,
  adminsCount: null,
};

const adminReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case actionTypes.SEARCH_USER_BY_EMAIL_SUCCESS:
      return {
        ...state,
        searchedUser: payload.data,
      };
    case actionTypes.SEARCH_USER_BY_ID_SUCCESS:
      return {
        ...state,
        searchedUser: payload.data,
      };
    case actionTypes.UPDATE_USER_ADMIN_ROLE_SUCCESS:
      return {
        ...state,
        notificationMessage: 'Updated admin role',
        searchedUser: {
          ...state.searchedUser,
          isAdmin: payload.isAdmin,
        },
      };
    case actionTypes.ENABLE_DISABLE_USER_SUCCESS:
      return {
        ...state,
        notificationMessage: 'Updated user status',
        searchedUser: {
          ...state.searchedUser,
          isDisabled: payload.isDisabled,
        },
      };
    case actionTypes.FETCH_ALL_ADMINS_SUCCESS:
      return {
        ...state,
        admins: payload.data,
      };
    case actionTypes.ADMIN_DELETES_USER_SUCCESS:
      return {
        ...state,
        searchedUser: null,
      };
    case actionTypes.SET_ADMIN_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: payload.message,
      };
    case actionTypes.REMOVE_ADMIN_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: null,
      };
    case actionTypes.SET_ADMIN_NOTIFICATION_MESSAGE:
      return {
        ...state,
        notificationMessage: payload.message,
      };
    case actionTypes.REMOVE_ADMIN_NOTIFICATION_MESSAGE:
      return {
        ...state,
        notificationMessage: null,
      };
    default:
      return state;
  }
};

export default adminReducer;
