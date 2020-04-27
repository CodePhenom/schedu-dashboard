import httpClient from '../../../clients/http';
import * as actionCreators from './action-creators';
import { getAuthHeader } from '../../../lib/get-token';

export const fetchAllCollections = () => async (dispatch) => {
  try {
    const { data } = await httpClient.get('/collections', {
      headers: { ...getAuthHeader() },
    });

    dispatch(actionCreators.fetchAllCollectionsSuccess(data));
  } catch ({ message, response }) {
    let errorMessage = response ? response.data.message : message;
    dispatch(actionCreators.setCollectionErrorMessage(errorMessage));
  }
};

export const removeCollectionErrorMessage = () => (dispatch) => {
  dispatch(actionCreators.removeCollectionErrorMessage());
};

export const removeCollectionNotificationMessage = () => (dispatch) => {
  dispatch(actionCreators.removeCollectionNotificationMessage());
};
