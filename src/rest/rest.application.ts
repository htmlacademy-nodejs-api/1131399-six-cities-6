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
    return this.databaseClient.connect(connectionPath);
  }

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async initControllers() {
    this.server.use('/offers', this.offerController.router);
    this.server.use('/users', this.usersController.router);
  }

  public async init() {
    const port = this.config.get('PORT');
    this.logger.info(this.label.get('application.init'));
    this.logger.info(`${this.label.get('application.startOnPort')} ${port}`);
    this.logger.info(this.label.get('db.initDatabase'));
    try {
      await this.initDb();
      this.logger.info(this.label.get('db.databaseIsInitiated'));
    } catch(e) {
      this.logger.info(this.label.get('db.databaseInitiatedError'));
    }
    this.initControllers();
    this.logger.info(this.label.get('router.initializedControllers'));
    try {
      await this.initServer();
      this.logger.info(this.label.get('server.serverIsInitiated').replace('%PORT%', `${port}`));
    } catch(e) {
      this.logger.info(this.label.get('server.serverInitiatedError'));
    }
  }
}
