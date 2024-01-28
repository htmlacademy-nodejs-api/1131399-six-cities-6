import { config } from 'dotenv';
import { IConfig } from "./config.interface.js";
import { Logger } from '../logger/index.js';
import { configRestSchema, RestSchema } from './rest.schema.js';

export class Config implements IConfig<RestSchema> {
  private readonly config: RestSchema;
  constructor(
    private readonly logger: Logger
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Error reading .env file');
    }
    configRestSchema.load({});
    configRestSchema.validate({ allowed: 'strict', output: this.logger.info });

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file successfully parsed');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
