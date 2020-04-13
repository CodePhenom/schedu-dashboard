import actionNames from './action-names';

const { CHANGE_TO_DARK_THEME, CHANGE_TO_LIGHT_THEME } = actionNames.theme;

export const changeToDarkTheme = () => {
  return (dispatch) => {
    dispatch({ type: CHANGE_TO_DARK_THEME });
  };
};

export const changeToLightTheme = () => {
  return (dispatch) => {
    dispatch({ type: CHANGE_TO_LIGHT_THEME });
  };
};
