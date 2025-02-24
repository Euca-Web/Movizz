import { Movie, MovieListResponse } from '../types/movie';

const mockMovies: Movie[] = [
  {
    id: 1,
    title: "Arcane",
    posterUrl: "https://www.themoviedb.org/t/p/original/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
    rating: 4.8,
    overview: "Dans le monde de Runeterra, la tension monte entre deux villes autour d'une nouvelle technologie..."
  },
  {
    id: 2,
    title: "The Batman",
    posterUrl: "https://www.themoviedb.org/t/p/original/3pF4tO8vIRVOzytC5DfIvNB4QzB.jpg",
    rating: 4.5,
    overview: "Dans sa deuxième année de lutte contre le crime, Batman explore la corruption qui sévit à Gotham..."
  },
  {
    id: 3,
    title: "Dune",
    posterUrl: "https://www.themoviedb.org/t/p/original/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
    rating: 4.7,
    overview: "Paul Atreides, un jeune homme brillant né dans un grand destin, doit se rendre sur la planète la plus dangereuse..."
  },
  {
    id: 4,
    title: "Spider-Man: No Way Home",
    posterUrl: "https://www.themoviedb.org/t/p/original/5weKu49pzJCt06OPpjvT7cCRzVz.jpg",
    rating: 4.6,
    overview: "Avec l'identité de Spider-Man désormais révélée, Peter demande de l'aide au Doctor Strange..."
  },
  {
    id: 5,
    title: "Top Gun: Maverick",
    posterUrl: "https://www.themoviedb.org/t/p/original/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    rating: 4.9,
    overview: "Après plus de 30 ans de service en tant que l'un des meilleurs aviateurs de la Marine..."
  },
  {
    id: 6,
    title: "Inception",
    posterUrl: "https://www.themoviedb.org/t/p/original/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    rating: 4.8,
    overview: "Dom Cobb est un voleur expérimenté dans l'art périlleux de l'extraction..."
  }
];

export class MovizzApi {
  private getMoviesForPage(page: number, movies: Movie[] = mockMovies): MovieListResponse {
    const itemsPerPage = 4;
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const results = movies.slice(start, end);
    
    return {
      results,
      page,
      total: movies.length,
      totalPages: Math.ceil(movies.length / itemsPerPage)
    };
  }

  async getPopularMovies(page = 1): Promise<MovieListResponse> {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 500));
    return this.getMoviesForPage(page);
  }

  async searchMovies(query: string, page = 1): Promise<MovieListResponse> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const filteredMovies = mockMovies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    return this.getMoviesForPage(page, filteredMovies);
  }

  async getMovieById(id: number): Promise<Movie> {
    await new Promise(resolve => setTimeout(resolve, 500));
    const movie = mockMovies.find(m => m.id === id);
    if (!movie) {
      throw new Error('Movie not found');
    }
    return movie;
  }
}

export const api = new MovizzApi();
