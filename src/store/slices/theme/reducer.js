import actionTypes from './action-types';
import { themeOptions } from './../../../themes/index';

const initState = {
  currentTheme: 'light',
};

const themeReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_TO_ADMIN_THEME:
      return {
        ...state,
        currentTheme: themeOptions.admin,
      };
    case actionTypes.CHANGE_TO_USER_THEME:
      return {
        ...state,
        currentTheme: themeOptions.user,
      };
    default:
      return state;
  }
};

export default themeReducer;
