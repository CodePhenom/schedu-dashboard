import actionTypes from './action-types';

const initState = {
  collections: [],
  errorMessage: '',
  notificationMessage: '',
};

const collectionReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_ALL_COLLECTIONS_SUCCESS:
      return {
        ...state,
        collections: payload,
      };
    case actionTypes.SET_COLLECTION_NOTIFICATION_MESSAGE:
      return {
        ...state,
        notificationMessage: payload.message,
      };
    case actionTypes.REMOVE_COLLECTION_NOTIFICATION_MESSAGE:
      return {
        ...state,
        notificationMessage: '',
      };
    case actionTypes.SET_COLLECTION_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: payload,
      };
    case actionTypes.REMOVE_COLLECTION_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: '',
      };
    default:
      return state;
  }
};

export default collectionReducer;
