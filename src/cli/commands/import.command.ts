import { TSVFileReader } from '../../shared/libs/file-reader/tsv-file-reader.js';
import { OfferFactory } from '../offer-factory.js';
import { Command } from './command.interface.js';
// import { resolve } from 'node:path';


export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(filePaths: string[]): void {
    const offerFactory = new OfferFactory();
    const tsvFileReader = new TSVFileReader(filePaths[0]);
    tsvFileReader.read();
    tsvFileReader.on('string_ready', (data) => {
      const offers = (data as string[][]).map((i) => offerFactory.getOffer(i));
      console.log(offers);
    });
    tsvFileReader.on('error_reading', (e) => console.error(e.message));
  }
}
