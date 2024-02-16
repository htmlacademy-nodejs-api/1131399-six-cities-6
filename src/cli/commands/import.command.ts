import { IDatabaseClient } from '../../shared/libs/database-client/database-client.interface.js';
import { DatabaseClient } from '../../shared/libs/database-client/database-client.js';
import { OfferService } from '../../shared/models/offer/offer.service.js';
import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { ILogger } from '../../shared/libs/logger/logger.interface.js';
import { IOfferService } from '../../shared/models/offer/offer.service.interface.js';
import { OfferFactory } from '../offer-factory.js';
import { Command } from './command.interface.js';
import { Logger } from '../../shared/libs/logger/pino.logger.js';
import { ILabel } from '../../shared/libs/label/label.interface.js';
import { Label } from '../../shared/libs/label/label.js';
import { Config } from '../../shared/libs/config/rest.config.js';
import { OfferModel } from '../../shared/models/offer/offer.model.js';
import { IConfig } from '../../shared/libs/config/config.interface.js';
import { RestSchema } from '../../shared/libs/config/rest.schema.js';
import { getDbconnectionPath } from '../../shared/libs/database-client/helpers.js';
import { UserService } from '../../shared/models/user/user.service.js';
import { UserModel } from '../../shared/models/user/user.model.js';

export class ImportCommand implements Command {
  private offerService: IOfferService;
  private dbClient: IDatabaseClient;
  private logger: ILogger;
  private label: ILabel;
  private config: IConfig<RestSchema>;
  private currentCount = 0;
  private targetCount = 0;


  constructor() {
    this.logger = new Logger();
    this.label = new Label();
    this.config = new Config(this.logger, this.label);
    this.offerService = new OfferService(this.logger, this.label, OfferModel, new UserService(this.logger, this.label, UserModel));
    this.dbClient = new DatabaseClient(this.logger, this.label);
  }

  public getName(): string {
    return '--import';
  }

  public async execute(filePaths: string[]): Promise<void> {
    const path = getDbconnectionPath({
      username: this.config.get('DB_USER'),
      password: this.config.get('DB_PASSWORD'),
      port: this.config.get('DB_PORT').toString(),
      host: this.config.get('DB_HOST'),
      databaseName: this.config.get('DB_NAME'),
    });
    await this.dbClient.connect(path);
    const offerFactory = new OfferFactory();
    const tsvFileReader = new TSVFileReader(filePaths[0]);
    tsvFileReader.read();
    tsvFileReader.on('string_ready', (data) => {
      (data as string[][]).forEach(async (i) => {
        try {
          const offer = offerFactory.getOffer(i);

          await this.offerService.createOffer(offer);
          this.currentCount += 1;
          if (this.targetCount === this.currentCount) {
            this.dbClient.disconnect();
          }
        } catch(e) {
          this.logger.info(this.label.get('db.createOfferError'));
          this.dbClient.disconnect();
        }
      });
    });
    tsvFileReader.on('final_count_end', (data) => {
      this.targetCount = data;
    });
    tsvFileReader.on('error_reading', (e) => console.error(e.message));
  }
}
