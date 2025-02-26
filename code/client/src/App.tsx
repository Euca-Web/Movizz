import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MoviesProvider } from './context/MoviesContext';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import router from './service/router';
import './styles/variables.css';
import './styles/global.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 2,
    },
  },
});

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <MoviesProvider>
            <RouterProvider router={router} />
          </MoviesProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;