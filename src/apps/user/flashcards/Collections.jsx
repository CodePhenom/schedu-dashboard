import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  fetchAllCollections,
  fetchAllCollectionsEraseError,
  deleteCollection,
  deleteCollectionEraseError,
} from '../../../store/slices/collection/actions';
import { connect } from 'react-redux';
import ListOfCollections from './ListOfCollections';
import AddNewCollection from './AddNewCollection';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  progressContainer: {
    display: 'flex',
    height: 500,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const Collectinos = (props) => {
  const {
    collections,
    fetchCollectionsPending,
    fetchCollectionsError,
    addCollectionPending,
    deleteCollectionError,
    deleteCollectionPending,
  } = props.collection;
  const classes = useStyles();

  useEffect(() => {
    props.fetchAllCollections();
  }, []);

  if (
    fetchCollectionsPending ||
    deleteCollectionPending ||
    addCollectionPending
  ) {
    return (
      <div className={classes.progressContainer}>
        <CircularProgress size={120} thickness={5} disableShrink />
      </div>
    );
  }

  const handleDelete = (id) => {
    props.deleteCollection(id);
  };

  const handleCloseFetchSnackBar = () => {
    props.fetchAllCollectionsEraseError();
  };

  const handleCloseDeleteSnackBar = () => {
    props.deleteCollectionEraseError();
  };

  return (
    <div className={classes.root}>
      <AddNewCollection />
      <ListOfCollections collections={collections} onDelete={handleDelete} />
      {fetchCollectionsError && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={Boolean(fetchCollectionsError)}
          onClose={handleCloseFetchSnackBar}
          message={fetchCollectionsError}
        />
      )}
      {deleteCollectionError && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={Boolean(deleteCollectionError)}
          onClose={handleCloseDeleteSnackBar}
          message={deleteCollectionError}
        />
      )}
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
    fetchAllCollectionsEraseError: () =>
      dispatch(fetchAllCollectionsEraseError()),
    deleteCollection: (id) => dispatch(deleteCollection(id)),
    deleteCollectionEraseError: () => dispatch(deleteCollectionEraseError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collectinos);
