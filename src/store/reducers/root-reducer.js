import authReducer from './auth-reducer';
import adminReducer from './admin-reducer';
import themeReducer from './theme-reducer';
import { firebaseReducer } from 'react-redux-firebase';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  theme: themeReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
