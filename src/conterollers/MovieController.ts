import { Request, Response } from 'express';
import { z } from 'zod';
import { FetchAndStoreMoviesService } from '../services/FetchAndStoreMoviesService';
import { GetAllMoviesService } from '../services/GetAllMoviesService';

export class MovieController {
  private fetchAndStoreMoviesService: FetchAndStoreMoviesService;
  private getAllMoviesService: GetAllMoviesService;

  constructor() {
    this.fetchAndStoreMoviesService = new FetchAndStoreMoviesService();
    this.getAllMoviesService = new GetAllMoviesService();
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
      const movies = await this.fetchAndStoreMoviesService.execute(countryCode, type);
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

  async getAllMovies(req: Request, res: Response): Promise<Response> {
    try {
      const movies = await this.getAllMoviesService.execute();
      if(movies.length === 0) {
        return res.status(200).json({ message: "No movies found."});
      }
      return res.status(200).json({ movies });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ message: error.message || 'Error fetching movies' });
      }
      return res.status(500).json({ message: 'Unknown error.' });
    }
  }
}
