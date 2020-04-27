import actionTypes from './action-types';

export const fetchAllCollectionsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_COLLECTIONS_SUCCESS,
  payload: data,
});

export const setCollectionNotificationMessage = (message) => ({
  type: actionTypes.SET_COLLECTION_NOTIFICATION_MESSAGE,
  payload: message,
});

export const removeCollectionNotificationMessage = () => ({
  type: actionTypes.REMOVE_COLLECTION_NOTIFICATION_MESSAGE,
});

export const setCollectionErrorMessage = (message) => ({
  type: actionTypes.SET_COLLECTION_ERROR_MESSAGE,
  payload: message,
});

export const removeCollectionErrorMessage = () => ({
  type: actionTypes.REMOVE_COLLECTION_ERROR_MESSAGE,
});
