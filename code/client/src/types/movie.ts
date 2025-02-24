export interface Movie {
  id: number;
  title: string;
  posterUrl: string;
  releaseDate?: string;
  rating?: number;
  overview?: string;
  genres?: string[];
}

export interface MovieListResponse {
  results: Movie[];
  total: number;
  page: number;
  totalPages: number;
}
