import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { FormControl, InputLabel, Input, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Chip from '@material-ui/core/Chip';
import { connect } from 'react-redux';
import {
  addNewCollection,
  addNewCollectionEraseError,
} from '../../../store/slices/collection/actions';

const useStyles = makeStyles((theme) => ({
  card: {
    width: 150,
    display: 'flex',
    justifyContent: 'center',
    marginRight: 20,
  },
  title: {
    fontSize: 14,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
}));

const AddNewCollection = (props) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.addNewCollectionEraseError();
    setOpen(false);
  };

  const handleCloseError = () => {
    props.addNewCollectionEraseError();
  };

  const handleInputChange = (e) => setName(e.target.value);

  const handleAddCollection = () => {
    if (name && name.trim() !== '') {
      props.addNewCollection({ name });
      setName('');
    }
  };

  if (props.collection.addCollectionError) {
    console.log(props.collection.addCollectionError);
  }

  const errorElement = (
    <Chip
      label={props.collection.addCollectionError}
      onDelete={handleCloseError}
      color='primary'
    />
  );

  const form = (
    <Fade in={open}>
      <div className={classes.paper}>
        <h2 id='transition-modal-title'>Add a new collection</h2>
        {props.collection.addCollectionError && errorElement}
        <FormControl className={classes.margin}>
          <InputLabel htmlFor='input-with-icon-adornment'>
            Type collection name
          </InputLabel>
          <Input id='input-with-icon-adornment' onChange={handleInputChange} />
          <Button onClick={handleAddCollection}>ADD</Button>
        </FormControl>
      </div>
    </Fade>
  );

  return (
    <>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            className={classes.title}
            color='textSecondary'
            gutterBottom
          >
            <IconButton onClick={handleOpen} size='small'>
              <AddIcon fontSize='inherit' />
            </IconButton>
          </Typography>
        </CardContent>
      </Card>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {form}
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    collection: state.collection,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addNewCollection: (input) => dispatch(addNewCollection(input)),
    addNewCollectionEraseError: (input) =>
      dispatch(addNewCollectionEraseError(input)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddNewCollection);
