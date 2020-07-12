import actionTypes from './action-types';

const initState = {
  collections: [],
  fetchCollectionsPending: false,
  fetchCollectionsError: null,
  addCollectionPending: false,
  addCollectionError: null,
  deleteCollectionPending: false,
  deleteCollectionError: null,
  errorMessage: '',
  notificationMessage: '',
};

const collectionReducer = (state = initState, { type, payload }) => {
  switch (type) {
    // ADD COLLECTION
    case actionTypes.ADD_NEW_COLLECTION_REQUEST:
      return {
        ...state,
        addCollectionPending: true,
      };
    case actionTypes.ADD_NEW_COLLECTION_SUCCESS:
      return {
        ...state,
        collections: [payload, ...state.collections],
        addCollectionPending: false,
      };
    case actionTypes.ADD_NEW_COLLECTION_FAILURE:
      return {
        ...state,
        addCollectionPending: false,
        addCollectionError: payload,
      };
    case actionTypes.ADD_NEW_COLLECTION_ERASE_ERROR:
      return {
        ...state,
        addCollectionError: null,
      };
    // FETCH COLLECTIONS
    case actionTypes.FETCH_ALL_COLLECTIONS_REQUEST:
      return {
        ...state,
        fetchCollectionsPending: true,
      };
    case actionTypes.FETCH_ALL_COLLECTIONS_SUCCESS:
      return {
        ...state,
        collections: payload,
        fetchCollectionsPending: false,
      };
    case actionTypes.FETCH_ALL_COLLECTIONS_FAILURE:
      return {
        ...state,
        fetchCollectionsPending: false,
        fetchCollectionsError: payload,
      };
    case actionTypes.FETCH_ALL_COLLECTIONS_ERASE_ERROR:
      return {
        ...state,
        fetchCollectionsError: null,
      };
    // DELETE COLLECTION
    case actionTypes.DELETE_COLLECTION_REQUEST:
      return {
        ...state,
        deleteCollectionPending: true,
      };
    case actionTypes.DELETE_COLLECTION_SUCCESS:
      return {
        ...state,
        collections: state.collections.filter(
          (collection) => collection.id !== payload
        ),
        deleteCollectionPending: false,
      };
    case actionTypes.DELETE_COLLECTION_FAILURE:
      return {
        ...state,
        deleteCollectionPending: false,
        deleteCollectionError: payload,
      };
    case actionTypes.DELETE_COLLECTION_ERASE_ERROR:
      return {
        ...state,
        deleteCollectionError: null,
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
