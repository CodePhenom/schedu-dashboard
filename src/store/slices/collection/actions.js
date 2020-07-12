import httpClient from '../../../clients/http';
import * as actionCreators from './action-creators';
import { getAuthHeader } from '../../../lib/get-token';

// ADD COLLECTIONS
export const addNewCollection = (input) => async (dispatch) => {
  try {
    dispatch(actionCreators.addNewCollectionRequest());
    const { data } = await httpClient.post('/collections', input, {
      headers: { ...getAuthHeader() },
    });
    dispatch(actionCreators.addNewCollectionSuccess(data));
  } catch ({ message }) {
    // let errorMessage = response ? response.data.message : message;
    dispatch(actionCreators.addNewCollectionFailure(message));
  }
};

export const addNewCollectionEraseError = () => (dispatch) => {
  dispatch(actionCreators.addNewCollectionEraseError());
};

// FETCH COLLECTIONS
export const fetchAllCollections = () => async (dispatch) => {
  try {
    dispatch(actionCreators.fetchAllCollectionsRequest());
    const { data } = await httpClient.get('/collections', {
      headers: { ...getAuthHeader() },
    });

    dispatch(actionCreators.fetchAllCollectionsSuccess(data));
  } catch ({ message }) {
    dispatch(actionCreators.fetchAllCollectionsFailure(message));
  }
};

export const fetchAllCollectionsEraseError = () => (dispatch) => {
  dispatch(actionCreators.fetchAllCollectionsEraseError());
};

// DELETE COLLECTION
export const deleteCollection = (id) => async (dispatch) => {
  try {
    dispatch(actionCreators.deleteCollectionRequest());
    await httpClient.delete(`/collections/${id}`, {
      headers: { ...getAuthHeader() },
    });
    dispatch(actionCreators.deleteCollectionSuccess(id));
  } catch ({ message }) {
    dispatch(actionCreators.deleteCollectionFailure(message));
  }
};

export const deleteCollectionEraseError = () => (dispatch) => {
  dispatch(actionCreators.deleteCollectionEraseError());
};

// sssss
export const removeCollectionErrorMessage = () => (dispatch) => {
  dispatch(actionCreators.removeCollectionErrorMessage());
};

export const removeCollectionNotificationMessage = () => (dispatch) => {
  dispatch(actionCreators.removeCollectionNotificationMessage());
};
