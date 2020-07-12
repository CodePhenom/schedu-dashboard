import React, { useEffect } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { adminRoutes } from '../../../routes';
import PrivateAdminRoute from '../../common/PrivateAdminRoute';
import { changeToAdminTheme } from './../../../store/slices/theme/actions';
import MyAppBar from './AppBar';
import MyDrawer from './Drawer';

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  };
});

function AdminLayout(props) {
  useEffect(() => {
    props.changeToAdminTheme();
  }, []);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <MyAppBar />
      <MyDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          {adminRoutes.map((route, id) => (
            <PrivateAdminRoute {...route} key={id} />
          ))}
          <Redirect from='/admin' to='/' />
        </Switch>
      </main>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeToAdminTheme: () => dispatch(changeToAdminTheme()),
  };
};

export default connect(null, mapDispatchToProps)(AdminLayout);
