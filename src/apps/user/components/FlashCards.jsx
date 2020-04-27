import React, { useEffect } from 'react';
import {
  fetchAllCollections,
  removeCollectionErrorMessage,
  removeCollectionNotificationMessage,
} from '../../../store/slices/collection/actions';
import Notification from '../../common/snackbar/Notification';
import { connect } from 'react-redux';

const FlashCards = (props) => {
  const { errorMessage, notificationMessage } = props.collection;

  useEffect(() => {
    props.fetchAllCollections();
  }, []);

  const handleCloseErrorSnackBar = () => {
    props.removeCollectionErrorMessage();
  };

  const handleCloseInfoSnackBar = () => {
    props.removeCollectionNotificationMessage();
  };

  return (
    <div>
      <Notification
        open={Boolean(errorMessage)}
        handleClose={handleCloseErrorSnackBar}
        message={errorMessage}
        duration={5000}
        type='error'
      />
      <Notification
        open={Boolean(notificationMessage)}
        handleClose={handleCloseInfoSnackBar}
        message={notificationMessage}
        duration={5000}
        type='success'
      />
      {props.collection.collections &&
        props.collection.collections.map((collection) => (
          <div key={collection.id}>{collection.name}</div>
        ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    collection: state.collection,
    auth: state.firebase,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllCollections: () => dispatch(fetchAllCollections()),
    removeCollectionNotificationMessage: () =>
      dispatch(removeCollectionNotificationMessage()),
    removeCollectionErrorMessage: () =>
      dispatch(removeCollectionErrorMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlashCards);
