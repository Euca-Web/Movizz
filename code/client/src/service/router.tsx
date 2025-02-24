import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home/Home';
import MoviesPage from '../pages/Movies/MoviesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/movies',
    element: <MoviesPage />
  }
]);

export default router;
