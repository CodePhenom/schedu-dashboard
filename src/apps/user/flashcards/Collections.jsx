import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { fetchAllCollections } from '../../../store/slices/collection/actions';
import { connect } from 'react-redux';
import ListOfCollections from './ListOfCollections';
import AddNewCollection from './AddNewCollection';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
});

const Collectinos = (props) => {
  const { collections } = props.collection;
  const classes = useStyles();

  useEffect(() => {
    props.fetchAllCollections();
  }, []);

  if (collections.length === 0) return null;

  return (
    <div className={classes.root}>
      <AddNewCollection />
      <ListOfCollections collections={collections} />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Collectinos);
