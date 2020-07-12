import actionTypes from './action-types';

// ADD NEW COLLECTION
export const addNewCollectionRequest = () => ({
  type: actionTypes.ADD_NEW_COLLECTION_REQUEST,
});

export const addNewCollectionSuccess = (data) => ({
  type: actionTypes.ADD_NEW_COLLECTION_SUCCESS,
  payload: data,
});

export const addNewCollectionFailure = (message) => ({
  type: actionTypes.ADD_NEW_COLLECTION_FAILURE,
  payload: message,
});

export const addNewCollectionEraseError = () => ({
  type: actionTypes.ADD_NEW_COLLECTION_ERASE_ERROR,
});

// FETCH ALL COLLECTIONS
export const fetchAllCollectionsRequest = () => ({
  type: actionTypes.FETCH_ALL_COLLECTIONS_REQUEST,
});

export const fetchAllCollectionsSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_COLLECTIONS_SUCCESS,
  payload: data,
});

export const fetchAllCollectionsFailure = (message) => ({
  type: actionTypes.FETCH_ALL_COLLECTIONS_FAILURE,
  payload: message,
});

export const fetchAllCollectionsEraseError = () => ({
  type: actionTypes.FETCH_ALL_COLLECTIONS_ERASE_ERROR,
});

// DELETE COLLECTION
export const deleteCollectionRequest = () => ({
  type: actionTypes.DELETE_COLLECTION_REQUEST,
});

export const deleteCollectionSuccess = (collectionId) => ({
  type: actionTypes.DELETE_COLLECTION_SUCCESS,
  payload: collectionId,
});

export const deleteCollectionFailure = (message) => ({
  type: actionTypes.DELETE_COLLECTION_FAILURE,
  payload: message,
});

export const deleteCollectionEraseError = () => ({
  type: actionTypes.DELETE_COLLECTION_ERASE_ERROR,
});

// sssss
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
