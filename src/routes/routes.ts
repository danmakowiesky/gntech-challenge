import { Router } from 'express';
import { MovieController } from '../conterollers/MovieController';

const router = Router();
const movieController = new MovieController(); 

router.get('/get-movies-from-imdb', (req, res) => {
  movieController.fetchAndStoreMovies(req, res).catch((error) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  });
});

router.get('/get-all-movies', (req, res) => {
  movieController.getAllMovies(req, res).catch((error) => {
    console.error('Unhandled error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  })
})

export { router };
