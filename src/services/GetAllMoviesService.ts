import type { MovieDto } from "../DTO/MovieDTO";
import { MovieRepository } from "../repository/movieRepository";

export class GetAllMoviesService {
  private movieRepository: MovieRepository;

  constructor() {
    this.movieRepository = new MovieRepository();
  }

  async execute(): Promise<MovieDto[]> {
    try {
      const movies = await this.movieRepository.getAllMovies();
      return movies.map((movie) => ({
        url: movie.url,
        originalTitle: movie.originalTitle,
        type: movie.type,
        description: movie.description,
        startYear: movie.startYear ?? undefined, 
        genre: movie.genre,
      }));
    } catch (error) {
      let errorMessage = "Unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      } else if (typeof error === "object" && error !== null) {
        errorMessage = JSON.stringify(error);
      }
      throw new Error(`Error while fetching or processing movies: ${errorMessage}`);
    }
  }
}
