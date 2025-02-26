import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import SimpleLayout from '../layout/SimpleLayout';
import Home from '../pages/Home/Home';
import MoviesAZ from '../pages/MoviesAZ/MoviesAZ';
import RecentMovies from '../pages/RecentMovies/RecentMovies';
import CompactView from '../pages/CompactView/CompactView';
import LegalNotice from '../pages/Legal/LegalNotice';
import TermsOfUse from '../pages/Legal/TermsOfUse';
import Contact from '../pages/Contact/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'films-az',
        element: <MoviesAZ />
      },
      {
        path: 'films-recents',
        element: <RecentMovies />
      },
      {
        path: 'films-compact',
        element: <CompactView />
      }
    ]
  },
  {
    element: <SimpleLayout />,
    children: [
      {
        path: '/mentions-legales',
        element: <LegalNotice />
      },
      {
        path: '/conditions-utilisation',
        element: <TermsOfUse />
      },
      {
        path: '/contact',
        element: <Contact />
      }
    ]
  }
]);

export default router;
