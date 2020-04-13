import { createMuiTheme } from '@material-ui/core';
import lightTheme from './lightTheme';
import darkTheme from './darkTheme';

const dark = createMuiTheme(darkTheme);
const light = createMuiTheme(lightTheme);

export const themeOptions = {
  dark: 'dark',
  light: 'light',
};

export default {
  light,
  dark,
};
