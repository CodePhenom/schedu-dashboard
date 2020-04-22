import actionNames from '../actions/action-types';
import { themeOptions } from './../../themes/index';

const { CHANGE_TO_DARK_THEME, CHANGE_TO_LIGHT_THEME } = actionNames.theme;

const initState = {
  currentTheme: 'light',
};

const themeReducer = (state = initState, action) => {
  switch (action.type) {
    case CHANGE_TO_DARK_THEME:
      return {
        ...state,
        currentTheme: themeOptions.dark,
      };
    case CHANGE_TO_LIGHT_THEME:
      return {
        ...state,
        currentTheme: themeOptions.light,
      };
    default:
      return state;
  }
};

export default themeReducer;
