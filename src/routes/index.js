import Login from '../apps/common/Login';
import Register from '../apps/common/Register';
import Home from './../apps/user/Home';
import Instructions from './../apps/user/Instructions';
import AdminHome from './../apps/admin/Home';
import AdminUsers from './../apps/admin/Users';
import AdminAdmins from './../apps/admin/Admins';

const publicRoutes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
];

const privateRoutes = [
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/instructions',
    component: Instructions,
  },
];

const adminRoutes = [
  {
    path: '/admin/users',
    component: AdminUsers,
  },
  {
    path: '/admin/admins',
    component: AdminAdmins,
  },
  {
    path: '/admin',
    component: AdminHome,
  },
];

export { publicRoutes, privateRoutes, adminRoutes };
