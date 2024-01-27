import { ILogger } from './logger.interface.js';
import {Logger as PinoInstance, pino } from 'pino';

export class Logger implements ILogger {
  private readonly logger: PinoInstance;
  constructor() {
    this.logger = pino();
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
