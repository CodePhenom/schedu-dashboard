import authReducer from '../slices/auth/reducer';
import adminReducer from '../slices/admin/reducer';
import themeReducer from '../slices/theme/reducer';
import { firebaseReducer } from 'react-redux-firebase';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  theme: themeReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
