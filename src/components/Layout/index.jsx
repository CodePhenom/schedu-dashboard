import React from 'react';
import { logout } from '../../clients/auth';
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
  Button
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import MenuIcon from '@material-ui/icons/Menu';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Instructions from '../Instructions';
import Home from './../Home';
import { connect } from 'react-redux';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  appBarTitle: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

function ResponsiveDrawer(props) {
  const {
    container,
    location: { pathname }
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
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary='Home' />
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
          <Button color='inherit' onClick={logout}>
            Logout
          </Button>
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
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation='css'>
          <Drawer
            classes={{
              paper: classes.drawerPaper
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
          <Route path='/instructions' component={Instructions} />
          <Route path='/home' component={Home} />
          <Redirect from='/' to='/home' />
        </Switch>
      </main>
    </div>
  );
}

const mapStateToProps = state => {
  console.log('Layout - redux state ', state);
  return {};
};

export default connect(mapStateToProps)(ResponsiveDrawer);
