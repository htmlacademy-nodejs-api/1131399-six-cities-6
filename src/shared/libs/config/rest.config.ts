import { DotenvParseOutput, config } from 'dotenv';
import { IConfig } from "./config.interface.js";
import { Logger } from '../logger/index.js';

export class Config implements IConfig {
  private readonly config: NodeJS.ProcessEnv;
  constructor(
    private readonly logger: Logger
  ) {
    const parsedOutput = config();

    if (parsedOutput.error) {
      throw new Error('Error reading .env file');
    }

    this.config = <DotenvParseOutput>parsedOutput.parsed;
    this.logger.info('.env file successfully parsed');
  }

  public get(key: string): string | undefined {
    return this.config[key]
  }
}
