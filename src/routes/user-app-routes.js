import Home from '../apps/user/components/Home';
import Instructions from '../apps/user/components/Instructions';
import FlashCards from '../apps/user/flashcards';

export default [
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/instructions',
    component: Instructions,
  },
  {
    path: '/flashcards',
    component: FlashCards,
  },
];
