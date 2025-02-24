import React, { createContext, useContext, useState, useCallback } from 'react';
import { Movie, MovieListResponse } from '../types/movie';
import { api } from '../services/api';

interface MoviesContextType {
  movies: Movie[];
  loading: boolean;
  error: Error | null;
  searchMovies: (query: string) => Promise<void>;
  getPopularMovies: () => Promise<void>;
  currentPage: number;
  totalPages: number;
  loadMore: () => Promise<void>;
}

const MoviesContext = createContext<MoviesContextType | undefined>(undefined);

export const MoviesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleResponse = (response: MovieListResponse) => {
    setMovies(currentPage === 1 ? response.results : [...movies, ...response.results]);
    setTotalPages(response.totalPages);
  };

  const searchMovies = useCallback(async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.searchMovies(query, 1);
      setCurrentPage(1);
      handleResponse(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  }, []);

  const getPopularMovies = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.getPopularMovies(1);
      setCurrentPage(1);
      handleResponse(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (loading || currentPage >= totalPages) return;
    
    try {
      setLoading(true);
      const nextPage = currentPage + 1;
      const response = await api.getPopularMovies(nextPage);
      setCurrentPage(nextPage);
      handleResponse(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  }, [currentPage, loading, totalPages]);

  const value = {
    movies,
    loading,
    error,
    searchMovies,
    getPopularMovies,
    currentPage,
    totalPages,
    loadMore,
  };

  return <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>;
};

export const useMovies = () => {
  const context = useContext(MoviesContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MoviesProvider');
  }
  return context;
};
