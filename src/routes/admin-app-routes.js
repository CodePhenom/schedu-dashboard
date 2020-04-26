import AdminHome from './../apps/admin/Home';
import AdminUsers from './../apps/admin/Users';
import AdminAdmins from './../apps/admin/Admins';

export default [
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
