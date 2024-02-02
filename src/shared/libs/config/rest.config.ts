import { injectable, inject } from 'inversify';
import { config } from 'dotenv';
import { IConfig } from './config.interface.js';
import { ILogger } from '../logger/index.js';
import { configRestSchema, RestSchema } from './rest.schema.js';
import { Component } from '../../types/index.js';
import { ILabel } from '../label/label.interface.js';

@injectable()
export class Config implements IConfig<RestSchema> {
  private readonly config: RestSchema;
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Label) private readonly label: ILabel
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error(this.label.get('config.errorReadingEnvFile'));
    }
    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
    this.logger.info(this.label.get('config.envFileSuccessfullyParsed'));
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
