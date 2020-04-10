import authReducer from './auth-reducer';
import adminReducer from './admin-reducer';
import { firebaseReducer } from 'react-redux-firebase';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  admin: adminReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
