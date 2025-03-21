import bodyParser from "body-parser";
import cors from "cors";
import express, { Application } from "express";
import { errorHandler } from "./api/middlewares/error.middleware";
import creationAccountRouter from "./api/routes/creationAccount.routes";
import userRouter from "./api/routes/user.routes";
import dbConsts from "./shared/constants/database";
import { DatabaseUriNotFoundException } from "./exceptions/database-uri-not-found";
import mongoose from "mongoose";

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
    this._server.use(bodyParser.json({ limit: "50mb" }));
    this._server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
    this._server.use(cors());
  }

  private setRoutes() {
    this._server.use("/createAcc", creationAccountRouter);
    this._server.use("/user", userRouter);
  }

  private setErrorHandler() {
    this._server.use(errorHandler);
  }

  private async setMongoConnection() {
    mongoose.Promise = global.Promise;
    try {
      if (!dbConsts.DATABASE_ADDRESS) {
        throw new DatabaseUriNotFoundException(
          "missing environment variable [DATABASE_ADDRESS]"
        );
      }

      mongoose.set("strictQuery", true);
      const server = await mongoose.connect(
        `${dbConsts.DATABASE_ADDRESS}/AuthAPI`
      );

      console.log(
        `[MongoDB Connection] server.connection.name: ${server.connection.name}`
      );
    } catch (error) {
      console.error("Could not connect into MongoDB, error: ", error);
      process.exit();
    }
  }
}
