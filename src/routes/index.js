import Login from '../Components/Login';
import Register from '../Components/Register';
import Home from './../Components/Home';
import Instructions from './../Components/Instructions';
import AdminHome from './../Components/Admin/Home';
import AdminUsers from './../Components/Admin/Users';
import AdminAdmins from './../Components/Admin/Admins';

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
