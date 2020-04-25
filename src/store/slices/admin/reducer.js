import actionTypes from './action-types';

const initState = {
  searchedUser: null,
  admins: [],
  adminErrorMessage: null,
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
        searchedUser: payload.data,
      };
    case actionTypes.ENABLE_DISABLE_USER_SUCCESS:
      return {
        ...state,
        notificationMessage: 'Updated user status',
        searchedUser: {
          ...state.searchedUser,
          isEnable: payload.data.isEnable,
        },
      };
    case actionTypes.FETCH_ALL_ADMINS_SUCCESS:
      return {
        ...state,
        admins: payload.data,
      };
    case actionTypes.FETCH_USERS_COUNT_SUCCESS:
      return {
        ...state,
        usersCount: payload.data,
      };
    case actionTypes.FETCH_ADMINS_COUNT_SUCCESS:
      return {
        ...state,
        adminsCount: payload.data,
      };
    case actionTypes.ADMIN_DELETES_USER_SUCCESS:
      return {
        ...state,
        searchedUser: null,
      };
    case actionTypes.SET_ADMIN_ERROR_MESSAGE:
      return {
        ...state,
        adminErrorMessage: payload.message,
      };
    case actionTypes.REMOVE_ADMIN_ERROR_MESSAGE:
      return {
        ...state,
        adminErrorMessage: null,
      };
    default:
      return state;
  }
};

export default adminReducer;
