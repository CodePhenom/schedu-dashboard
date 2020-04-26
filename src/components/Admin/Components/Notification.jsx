import React from 'react';
import { Snackbar } from '@material-ui/core';
import SnackBarContentWrapper from './SnackbarContentWrapper';

const Notification = (props) => {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={Boolean(props.open)}
      onClose={props.handleClose}
      autoHideDuration={props.duration}
    >
      <SnackBarContentWrapper
        onClose={props.handleClose}
        variant={props.type}
        message={props.message}
      />
    </Snackbar>
  );
};

export default Notification;
