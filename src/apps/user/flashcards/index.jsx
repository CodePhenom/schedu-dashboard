import React from 'react';
import {
  removeCollectionErrorMessage,
  removeCollectionNotificationMessage,
} from '../../../store/slices/collection/actions';
import { connect } from 'react-redux';
import Notification from '../../common/snackbar/Notification';
import Collections from './Collections';

const FlashCards = (props) => {
  const { errorMessage, notificationMessage } = props.collection;

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
      <Collections />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    collection: state.collection,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    removeCollectionNotificationMessage: () =>
      dispatch(removeCollectionNotificationMessage()),
    removeCollectionErrorMessage: () =>
      dispatch(removeCollectionErrorMessage()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlashCards);
