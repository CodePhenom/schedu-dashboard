import React, { useEffect } from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';
import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { adminRoutes } from '../../../routes';
import DropDown from '../../Layout/DropDownMenu';
import PrivateAdminRoute from '../../PrivateAdminRoute';
import {
  changeToLightTheme,
  changeToDarkTheme,
} from './../../../store/actions/theme-action';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: 'flex',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      background: theme.palette.primary[800],
    },
    appBarTitle: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    adminButton: {
      // color: theme.palette.getContrastText(grey[500]),
      // backgroundColor: grey[500],
      // '&:hover': {
      //   backgroundColor: grey[700],
      // },
      marginRight: theme.spacing(3),
    },
  };
});

function AdminLayout(props) {
  useEffect(() => {
    props.changeToDarkTheme();
  }, []);

  const {
    container,
    location: { pathname },
  } = props;

  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      {/* <Hidden smDown implementation='css'> */}
      <div className={classes.toolbar} />
      {/* </Hidden> */}
      <Divider />
      <MenuList>
        <MenuItem component={Link} to='/admin' selected={'/admin' === pathname}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </MenuItem>
        <MenuItem
          component={Link}
          to='/admin/users'
          selected={'/admin/users' === pathname}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Users' />
        </MenuItem>
        <MenuItem
          component={Link}
          to='/admin/admins'
          selected={'/admin/admins' === pathname}
        >
          <ListItemIcon>
            <InfoOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary='Admins' />
        </MenuItem>
      </MenuList>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position='fixed' className={classes.appBar}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.appBarTitle} noWrap>
            SCHEDU ADMIN
          </Typography>
          {props.admin.isAdmin && (
            <Button
              className={classes.adminButton}
              component={Link}
              to='/'
              color='secondary'
              variant='contained'
            >
              Back To User Panel
            </Button>
          )}
          <DropDown />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        <Hidden smUp implementation='css'>
          <Drawer
            container={container}
            variant='temporary'
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant='permanent'
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          {adminRoutes.map((route, id) => (
            <PrivateAdminRoute {...route} key={id} />
          ))}
        </Switch>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    admin: state.admin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeToDarkTheme: () => dispatch(changeToDarkTheme()),
    changeToLightTheme: () => dispatch(changeToLightTheme()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminLayout);
