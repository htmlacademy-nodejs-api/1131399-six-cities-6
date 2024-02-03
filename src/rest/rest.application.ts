import { injectable, inject } from 'inversify';
import { IConfig } from '../shared/libs/config/config.interface.js';
import { RestSchema } from '../shared/libs/config/rest.schema.js';
import { ILogger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/types/index.js';
import { ILabel } from '../shared/libs/label/label.interface.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<RestSchema>,
    @inject(Component.Label) private readonly label: ILabel,
  ){}

  public async init() {
    this.logger.info(this.label.get('application.init'));
    this.logger.info(`${this.label.get('application.startOnPort')} ${this.config.get('PORT')}`);
  }
}
