import { injectable, inject } from 'inversify';
import express, { Express } from 'express';
import { IConfig } from '../shared/libs/config/config.interface.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { ILogger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/index.js';
import { ILabel } from '../shared/libs/label/label.interface.js';
import { IDatabaseClient } from '../shared/libs/database-client/index.js';
import { getDbconnectionPath } from '../shared/libs/database-client/index.js';
import { Controller } from '../shared/libs/rest/controller/controller.interface.js';
import { IBaseExceptionHandler } from '../shared/libs/exceptionHandler/exception-handler.interface.js';

@injectable()
export class RestApplication {
  private readonly server: Express;
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<RestSchema>,
    @inject(Component.Label) private readonly label: ILabel,
    @inject(Component.DatabaseClient) private readonly databaseClient: IDatabaseClient,
    @inject(Component.OfferController) private readonly offerController: Controller,
    @inject(Component.UsersController) private readonly usersController: Controller,
    @inject(Component.ExceptionHandler) private readonly exceptionHandler: IBaseExceptionHandler,
  ){
    this.server = express();
  }

  private async initDb() {
    const connectionPath = getDbconnectionPath({
      username: this.config.get('DB_USER'),
      password: this.config.get('DB_PASSWORD'),
      port: this.config.get('DB_PORT').toString(),
      host: this.config.get('DB_HOST'),
      databaseName: this.config.get('DB_NAME'),
    });
    this.logger.info(this.label.get('db.initDatabase'));
    try {
      this.databaseClient.connect(connectionPath);
      this.logger.info(this.label.get('db.databaseIsInitiated'));
    } catch(e) {
      this.logger.info(this.label.get('db.databaseInitiatedError'));
    }
  }

  private async initServer() {
    const port = this.config.get('PORT');
    try {
      this.server.listen(port);
      this.logger.info(this.label.get('server.serverIsInitiated').replace('%PORT%', `${port}`));
    } catch(e) {
      this.logger.info(this.label.get('server.serverInitiatedError'));
    }
  }

  private initMiddlewares() {
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(express.json());
  }

  private initControllers() {
    this.server.use('/offers', this.offerController.router);
    this.server.use('/users', this.usersController.router);
    this.logger.info(this.label.get('router.initializedControllers'));
  }

  private initExceptionHandler() {
    this.server.use(this.exceptionHandler.catch.bind(this.exceptionHandler));
  }

  public async init() {
    const port = this.config.get('PORT');
    this.logger.info(this.label.get('application.init'));
    this.logger.info(`${this.label.get('application.startOnPort')} ${port}`);
    await this.initDb();
    await this.initMiddlewares();
    await this.initControllers();
    await this.initExceptionHandler()
    await this.initServer();
  }
}
