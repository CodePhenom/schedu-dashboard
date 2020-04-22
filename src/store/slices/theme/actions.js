import * as actionCreators from './action-creators';

export const changeToAdminTheme = () => {
  return (dispatch) => {
    dispatch(actionCreators.changeToAdminTheme());
  };
};

export const changeToUserTheme = () => {
  return (dispatch) => {
    dispatch(actionCreators.changeToUserTheme());
  };
};
