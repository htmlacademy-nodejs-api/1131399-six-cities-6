import { ILogger } from './logger.interface.js';
import {Logger as PinoInstance, pino, transport as pinoTransport } from 'pino';
import { getLogPath } from './helpers.js';
import { PATH_TO_LOG_FILE } from '../../../constants/constants.js';

export class Logger implements ILogger {
  private readonly logger: PinoInstance;

  constructor() {
    const destination = getLogPath(PATH_TO_LOG_FILE);
    const transport = pinoTransport({
      targets: [
        {
          target: 'pino/file',
          options: {
            destination,
          }
        },
        {
          target: 'pino/file',
          options: {}
        }
      ],
    });
    this.logger = pino(transport);
  }

  public warn (message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  public debug (message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public info (message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public error (message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

}
