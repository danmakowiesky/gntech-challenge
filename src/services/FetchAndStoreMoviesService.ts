import axios from "axios";
import { MovieRepository } from "../repository/movieRepository";
import { MovieDto } from "../DTO/MovieDTO";

type FetchAndStoreMoviesServiceResponse = {
  message: string;
  insertedMovies: MovieDto[];
  success: boolean;
};

export class FetchAndStoreMoviesService {
  private movieRepository = new MovieRepository();

  async execute(countryCode: string, type: string): Promise<FetchAndStoreMoviesServiceResponse> {
    try {
      const options = {
        method: "GET",
        url: "https://imdb236.p.rapidapi.com/imdb/upcoming-releases",
        params: { countryCode, type },
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY!,
          "x-rapidapi-host": process.env.RAPID_API_HOST!
        },
      };

      const { data } = await axios.request(options);

      if (!data.length) {
        throw new Error("Invalid data structure received from IMDb API");
      }

      const movies = data.flatMap((release: any) =>
        release.titles.map((movie: any) => ({
          url: movie.url,
          originalTitle: movie.originalTitle || "Título desconhecido",
          type: movie.type || "Desconhecido",
          description: movie.description || "Sem descrição disponível",
          startYear: movie.startYear ?? null,
          genre: movie.genres || [],
        }))
      );

      const { success, message, insertedMovies } = await this.movieRepository.insert(movies);

      if (!success) {
        throw new Error(message);
      }

      return { success, message, insertedMovies };
    } catch (error: unknown) {
      let errorMessage = "Unknown error occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      } else if (typeof error === "object" && error !== null) {
        errorMessage = JSON.stringify(error);
      }
      throw new Error(
        `Error fetching or processing data from IMDb API: ${errorMessage}`
      );
    }
  }
}
