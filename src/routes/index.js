import Login from '../Components/Login';
import Register from '../Components/Register';
import Home from './../Components/Home';
import Instructions from './../Components/Instructions';
import Admin from './../Components/Admin';

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
    path: '/admin',
    component: Admin,
  },
];

export { publicRoutes, privateRoutes, adminRoutes };
