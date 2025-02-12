import express, { Application } from 'express';
import dotenv from 'dotenv';
import { router } from './routes/routes';

dotenv.config();

class Server {
  private app: Application;
  private readonly PORT: string | number;

  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || 3000;
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use('/', router);
  }

  public start(): void {
    this.app.listen(this.PORT, () => {
      console.log(`Server is running on port ${this.PORT}`);
    });
  }
}

const server = new Server();
server.start();