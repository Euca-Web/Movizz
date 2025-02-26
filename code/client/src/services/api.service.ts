import { useQuery } from '@tanstack/react-query';

interface PaginatedResponse<T> {
  data: T[];
  page: number;
  total: number;
  totalPages: number;
}

interface Movie {
  id: number;
  title: string;
  original_title: string;
  description: string;
  release_date: string;
  posterUrl: string;
  rating?: number;
  type: 'movie';
  genres: string;
}

interface Series {
  id: number;
  title: string;
  original_title: string;
  description: string;
  release_date: string;
  posterUrl: string;
  type: 'series';
  genres: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function fetchMovies(page = 1, limit = 10): Promise<PaginatedResponse<Movie>> {
  const response = await fetch(`${API_URL}/movie?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

async function fetchSeries(page = 1, limit = 10): Promise<PaginatedResponse<Series>> {
  const response = await fetch(`${API_URL}/series?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export function useMovies(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['movies', page, limit],
    queryFn: () => fetchMovies(page, limit),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useSeries(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['series', page, limit],
    queryFn: () => fetchSeries(page, limit),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
