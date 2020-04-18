import React from 'react';
import { withRouter } from 'react-router';
import {
  Divider,
  MenuList,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  Hidden,
} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    toolbar: theme.mixins.toolbar,
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
  };
});

function MyDrawer(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const {
    location: { pathname },
    container,
  } = props;

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
  );
}

export default withRouter(MyDrawer);
