import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  fetchAllCollections,
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
});

const Collectinos = (props) => {
  const {
    collections,
    fetchCollectionsPending,
    deleteCollectionError,
  } = props.collection;
  const classes = useStyles();

  useEffect(() => {
    props.fetchAllCollections();
  }, []);

  if (fetchCollectionsPending) {
    return <CircularProgress size={120} thickness={5} disableShrink />;
  }

  if (collections.length === 0) return null;

  const handleDelete = (id) => {
    props.deleteCollection(id);
  };

  const handleCloseSnackBar = () => {
    props.deleteCollectionEraseError();
  };

  return (
    <div className={classes.root}>
      <AddNewCollection />
      <ListOfCollections collections={collections} onDelete={handleDelete} />
      {deleteCollectionError && (
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          open={Boolean(deleteCollectionError)}
          onClose={handleCloseSnackBar}
          message={deleteCollectionError}
          // key={vertical + horizontal}
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
    deleteCollection: (id) => dispatch(deleteCollection(id)),
    deleteCollectionEraseError: () => dispatch(deleteCollectionEraseError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collectinos);
