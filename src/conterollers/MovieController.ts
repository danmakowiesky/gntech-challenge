import { Request, Response } from 'express';
import { z } from 'zod';
import { MovieService } from '../services/getAllMoviesService';

export class MovieController {
  private movieService: MovieService;

  constructor() {
    this.movieService = new MovieService();
  }

  async fetchAndStoreMovies(req: Request, res: Response): Promise<Response> {
    const querySchema = z.object({
      countryCode: z.string()
        .length(2, { message: "O código do país deve ter exatamente 2 caracteres." }),
      
      type: z.enum(['MOVIE', 'TV'], {
        errorMap: () => ({ message: "O tipo deve ser 'MOVIE' ou 'TV'." })
      }),
    });
    const validationResult = querySchema.safeParse(req.query);
    if (!validationResult.success) {
      return res.status(400).json({ 
        success: false,
        message: "Parâmetros inválidos.",
        errors: validationResult.error.format(),
      });
    }

    const { countryCode, type } = validationResult.data;

    try {
      const movies = await this.movieService.execute(countryCode, type);
      if (movies.insertedMovies.length === 0) {
        return res.status(200).json({ movies });
      }
      return res.status(201).json({ movies });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message || 'Erro ao buscar filmes' });
      }
      return res.status(500).json({ message: 'Erro desconhecido.' });
    }
  }
}
