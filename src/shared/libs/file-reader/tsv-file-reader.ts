import { IFileReader } from './file-reader.interface.js';
import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
// import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const highWaterMark = 8 * 1024 * 16;
export class TSVFileReader extends EventEmitter implements IFileReader {
  constructor(private readonly fileName: string) {
    super();
  }
  private rawData: string[] = [];

  public async read(): Promise<TSVFileReader> {
    const readStream = createReadStream(resolve('mocks', this.fileName), {
      highWaterMark,
      encoding: 'utf-8',
    });
    let currentString = '';
    let stringsArray: string[] = [];
    for await (const chank of readStream) {
      currentString = currentString + chank.toString();
      if (currentString.includes('\n')) {
        const strings = currentString.split('\n');
        const lastPart = strings[strings.length - 1];
        const previousParts = strings.slice(0, -1);
        stringsArray = stringsArray.concat(previousParts);
        if (lastPart.length) {
          currentString = lastPart;
        } else {
          currentString = '';
        }
      }
    }
    this.rawData = stringsArray;
    return this;
  }

  public toArray(): string[][] {
    const parsedData = this.rawData.map((i) => i.split('\t'));
    return parsedData as string[][];
  }
}
