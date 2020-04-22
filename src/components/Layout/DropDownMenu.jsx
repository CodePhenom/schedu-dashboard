import React from 'react';
import {
  Menu,
  MenuItem,
  Avatar,
  Paper,
  Typography,
  Divider,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { signOut } from '../../store/slices/auth/actions';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  menu: {
    marginTop: 40,
  },
  paper: {
    display: 'flex',
    flexWrap: 'no-wrap',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  avatar: {
    '& > *': {
      height: theme.spacing(16),
      width: theme.spacing(16),
    },
  },
  information: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signout: {
    width: 80,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 5,
  },
  email: {
    color: 'grey',
    fontWeight: '100',
  },
}));

const DropDownMenu = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles();

  const {
    auth: { photoURL, email },
    profile,
  } = props;

  let displayName = props.auth.displayName;
  if (!displayName && profile.name) {
    displayName = profile.name.displayName;
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUppercaseIntials = (firstName, lastName) => {
    return 'name'; // firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  };

  const renderAvatar = () => {
    const { name } = profile;
    return Boolean(photoURL) ? (
      <Avatar className={classes.avatar} aria-haspopup='true' src={photoURL} />
    ) : (
      <Avatar>
        {name && getUppercaseIntials(name.firstName, name.lastName)}
      </Avatar>
    );
  };

  return (
    <div>
      <Avatar
        aria-controls='simple-menu'
        aria-haspopup='true'
        src={photoURL}
        onClick={handleClick}
      />
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.menu}
      >
        <div>
          <Paper className={classes.paper} elevation={0}>
            <div className={classes.avatar}>{renderAvatar()}</div>
            <div className={classes.information}>
              <Typography>{displayName}</Typography>
              <Typography className={classes.email} variant='subtitle2'>
                {email}
              </Typography>
            </div>
          </Paper>
          <Divider />
          <MenuItem className={classes.signout} onClick={props.signOut}>
            Logout
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DropDownMenu);
