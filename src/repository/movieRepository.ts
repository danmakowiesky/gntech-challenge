import { PrismaClient } from '@prisma/client';
import { MovieDto } from '../DTO/MovieDTO';

export class MovieRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private async urlExists(url: string): Promise<boolean> {
    const movie = await this.prisma.movie.findUnique({
      where: { url },
    });
    return !!movie;
  }

  private async insertMovie(movie: MovieDto) {
    try {
      return await this.prisma.movie.create({
        data: {
          url: movie.url,
          originalTitle: movie.originalTitle,
          type: movie.type,
          description: movie.description,
          startYear: movie.startYear,
          genre: movie.genre,
        },
      });
    } catch (error) {
      console.error('Erro ao inserir filme:', error);
      throw new Error('Falha ao inserir filme');
    }
  }

  private formatDuplicateUrlsMessage(duplicateUrls: string[]): string {
    if (duplicateUrls.length > 0) {
      return `A URL(s) ${duplicateUrls.join(', ')} já está(ão) cadastrada(s). Nenhum filme foi inserido com essas URLs.`;
    }
    return 'Filmes inseridos com sucesso!';
  }

  private async processMovies(movies: MovieDto[]): Promise<{ insertedMovies: any[], duplicateUrls: string[] }> {
    const insertedMovies = [];
    const duplicateUrls = [];

    for (const movie of movies) {
      const movieExists = await this.urlExists(movie.url);
      
      if (movieExists) {
        duplicateUrls.push(movie.url);
      } else {
        const insertedMovie = await this.insertMovie(movie);
        insertedMovies.push(insertedMovie);
      }
    }

    return { insertedMovies, duplicateUrls };
  }

  async insert(movies: MovieDto[]): Promise<any> {
    const { insertedMovies, duplicateUrls } = await this.processMovies(movies);

    const message = this.formatDuplicateUrlsMessage(duplicateUrls);

    return {
      success: true,
      message,
      insertedMovies,
    };
  }
}
