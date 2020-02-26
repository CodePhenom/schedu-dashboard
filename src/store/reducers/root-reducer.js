import authReducer from './auth-reducer';
import { firebaseReducer } from 'react-redux-firebase';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  firebase: firebaseReducer
});

export default rootReducer;
