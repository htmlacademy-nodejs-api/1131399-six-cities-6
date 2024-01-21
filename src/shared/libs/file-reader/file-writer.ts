import { IFileWriter } from './file-writer.interface.js';
import { appendFile } from 'node:fs';
import { EventEmitter } from 'node:events';

export class FileWriter extends EventEmitter implements IFileWriter {
  constructor(private readonly filepath: string) {
    super()
  }

  public write(data: string): void {
    appendFile(this.filepath, `${data}\n`, (err) => {
      if (err) {
        console.log('Error adding data to the file', err?.message);
      }
    })
  }


}
