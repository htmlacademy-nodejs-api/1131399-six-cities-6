import { injectable, inject } from 'inversify';
import { IConfig } from '../shared/libs/config/config.interface.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { ILogger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/index.js';
import { ILabel } from '../shared/libs/label/label.interface.js';
import { IDatabaseClient } from '../shared/libs/database-client/index.js';
import { getDbconnectionPath } from '../shared/libs/database-client/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<RestSchema>,
    @inject(Component.Label) private readonly label: ILabel,
    @inject(Component.DatabaseClient) private readonly databaseClient: IDatabaseClient
  ){}

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

  public async init() {
    this.logger.info(this.label.get('application.init'));
    this.logger.info(`${this.label.get('application.startOnPort')} ${this.config.get('PORT')}`);
    this.logger.info(this.label.get('db.initDatabase'));
    try {
      await this.initDb();
      this.logger.info(this.label.get('db.databaseIsInitiated'));
    } catch(e) {
      this.logger.info(this.label.get('db.databaseInitiatedError'));
    }
  }
}
