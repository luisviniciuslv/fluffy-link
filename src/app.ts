import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import { errorHandler } from './api/middlewares/error.middleware';
import creationAccountRouter from './api/routes/creationAccount.routes';
import userRouter from './api/routes/user.routes';
import authRouter from './api/routes/auth.routes';
import redirectRouter from './api/routes/redirect.routes';
import { connectToDatabase } from './shared/database/mongoDbConnection';

export class App {
  private _server: Application;

  public get server() {
    return this._server;
  }

  constructor() {
    this._server = express();
    this.setConfig();
    this.setRoutes();
    this.setErrorHandler();
    this.setMongoConnection();
  }

  private setConfig() {
    this._server.use(bodyParser.json({ limit: '50mb' }));
    this._server.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    this._server.use(cors());
  }

  private setRoutes() {
    this._server.use('/createAcc', creationAccountRouter);
    this._server.use('/user', userRouter);
    this._server.use('/auth', authRouter);
    this._server.use('/', redirectRouter);
  }

  private setErrorHandler() {
    this._server.use(errorHandler);
  }

  private async setMongoConnection() {
    await connectToDatabase();
  }
}
