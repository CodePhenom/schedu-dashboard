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
import MenuIcon from '@material-ui/icons/Menu';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import ViewCarouselOutlinedIcon from '@material-ui/icons/ViewCarouselOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { userAppRoutes } from './../../../routes';
import DropDown from '../../common/DropDownMenu';
import { changeToUserTheme } from './../../../store/slices/theme/actions';

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
      marginRight: theme.spacing(3),
    },
  };
});

function ResponsiveDrawer(props) {
  useEffect(() => {
    props.changeToUserTheme();
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
        <MenuItem component={Link} to='/home' selected={'/home' === pathname}>
          <ListItemIcon>
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </MenuItem>
        <MenuItem
          component={Link}
          to='/flashcards'
          selected={'/flashcards' === pathname}
        >
          <ListItemIcon>
            <ViewCarouselOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary='FlashCards' />
        </MenuItem>
        <MenuItem
          component={Link}
          to='/instructions'
          selected={'/instructions' === pathname}
        >
          <ListItemIcon>
            <InfoOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary='Instructions' />
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
            SCHEDU
          </Typography>
          {props.auth.isAdmin && (
            <Button
              className={classes.adminButton}
              component={Link}
              to='/admin'
              color='secondary'
              variant='contained'
            >
              Admin Panel
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
          {userAppRoutes.map((route, id) => (
            <Route {...route} key={id} />
          ))}
          <Redirect from='/' to='/home' />
        </Switch>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    admin: state.admin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeToUserTheme: () => dispatch(changeToUserTheme()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDrawer);
