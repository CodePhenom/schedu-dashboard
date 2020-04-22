import { createMuiTheme } from '@material-ui/core';
import adminTheme from './adminTheme';
import userTheme from './userTheme';

const admin = createMuiTheme(adminTheme);
const user = createMuiTheme(userTheme);

export const themeOptions = {
  admin: 'admin',
  user: 'user',
};

export default {
  admin,
  user,
};
