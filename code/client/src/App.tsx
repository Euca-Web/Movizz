import { RouterProvider } from 'react-router-dom';
import { MoviesProvider } from './context/MoviesContext';
import router from './service/router';
import './styles/variables.css';
import './styles/global.css';

const App = () => {
  return (
    <MoviesProvider>
      <RouterProvider router={router} />
    </MoviesProvider>
  );
};

export default App;