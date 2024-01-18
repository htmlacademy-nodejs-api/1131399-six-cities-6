import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { OfferFactory } from '../offer-factory.js';
import { Command } from './command.interface.js';
import { resolve } from 'node:path';


export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(filePaths: string[]): void {
    const rawData = new TSVFileReader().read(filePaths.map((i) => resolve(i))).toArray();
    const offerFactory = new OfferFactory();
    const offers = rawData.map((i) => offerFactory.getOffer(i));
    console.log(offers);
  }
}
