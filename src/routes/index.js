import Login from '../Components/Login';
import Register from '../Components/Register';
import Home from './../Components/Home';
import Instructions from './../Components/Instructions';

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

export { publicRoutes, privateRoutes };
