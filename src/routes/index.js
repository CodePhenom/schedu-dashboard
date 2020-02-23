import Login from '../Components/Login';
import Register from '../Components/Register';

const publicRoutes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  }
];

export { publicRoutes };
