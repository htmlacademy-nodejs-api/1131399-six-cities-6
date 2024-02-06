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
import { OfferModel } from '../../shared/models/offer/offer.model.js';

export class ImportCommand implements Command {
  private offerService: IOfferService;
  private dbClient: IDatabaseClient;
  private logger: ILogger;
  private label: ILabel;


  constructor() {
    this.logger = new Logger();
    this.label = new Label();
    this.offerService = new OfferService(this.logger, this.label, OfferModel);
    this.dbClient = new DatabaseClient(this.logger, this.label);
  }

  public getName(): string {
    return '--import';
  }

  public async execute(filePaths: string[]): Promise<void> {
    const offerFactory = new OfferFactory();
    const tsvFileReader = new TSVFileReader(filePaths[0]);
    tsvFileReader.read();
    tsvFileReader.on('string_ready', (data) => {
      const offers = (data as string[][]).map((i) => {
        const offer = offerFactory.getOffer(i);
        this.offerService.create(offer);
      });
      console.log(offers);
      this.dbClient.disconnect();
    });
    tsvFileReader.on('error_reading', (e) => console.error(e.message));
    this.dbClient.disconnect();
  }
}
