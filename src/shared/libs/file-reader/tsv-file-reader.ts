import { IFileReader } from './file-reader.interface.js';
import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';
import { resolve } from 'node:path';

const highWaterMark = 8 * 1024;
export class TSVFileReader extends EventEmitter implements IFileReader {
  constructor(private readonly fileName: string) {
    super();
  }

  public async read() {
    try {
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
          if (previousParts.length) {
            this.emit('string_ready', this.stringToArray(previousParts));
          }
          stringsArray = stringsArray.concat(previousParts);
          if (lastPart.length) {
            currentString = lastPart;
          } else {
            currentString = '';
          }
        }
      }
    } catch (error) {
      this.emit('error_reading', error);
    }
  }

  public stringToArray(strings: string[]): string[][] {
    const parsedData = strings.map((i) => i.split('\t'));
    return parsedData as string[][];
  }
}
