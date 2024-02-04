import * as Mongoose from 'mongoose';
import _ from 'lodash';
import { injectable, inject } from 'inversify';
import { IDatabaseClient } from './database-client.interface.js';
import { Component } from '../../types/index.js';
import { ILogger } from '../logger/index.js';
import { ILabel } from '../label/label.interface.js';

@injectable()
export class DatabaseClient implements IDatabaseClient {
  private mongoose: typeof Mongoose | undefined;
  private isConnected: boolean;

  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Label) private readonly label: ILabel
  ) {
    this.isConnected = false;
  }

  public isConnectedToDB(): boolean {
    return this.isConnected;
  }

  public async connect(connectString: string): Promise<void> {
    try {
      if (!this.isConnectedToDB()) {
        this.logger.info(this.label.get('db.connectionIsStarting'));
        this.mongoose = await Mongoose.connect(connectString);
        this.isConnected = true;
        this.logger.info(this.label.get('db.connectionEstablished'));

      } else {
        this.logger.info(this.label.get('db.alreadyConnected'))
      }
    } catch (error) {
      this.logger.info(this.label.get('db.errorConnectingToDb'));
      throw new Error(this.label.get('db.errorConnectingToDb'));
    }
    return Promise.resolve();
  }

  public async disconnect() {
    try {
      if (!this.isConnectedToDB()) {
        this.logger.info(this.label.get('db.isAlreadyDisconnected'));
      } else {
        await this.mongoose?.disconnect?.();
        this.logger.info(this.label.get('db.isDisconnected'))
      }
    } catch(error) {
      this.logger.info(this.label.get('db.errorDisconnectingFromDb'));
    }
    return Promise.resolve();
  }

}
