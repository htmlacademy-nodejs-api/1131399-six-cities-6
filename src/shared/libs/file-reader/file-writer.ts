import { IFileWriter } from './file-writer.interface.js';
import { EventEmitter } from 'node:events';
import { createWriteStream, WriteStream } from 'node:fs';
export class FileWriter extends EventEmitter implements IFileWriter {
  private stream: WriteStream;
  constructor(private readonly filepath: string) {
    super();
    this.stream = createWriteStream(this.filepath, {
      flags: 'w',
      encoding: 'utf-8',
    });
    this.stream.on('finish', () => this.emit('finish'));
  }

  public async write(data: string): Promise<unknown> {
    const result = this.stream.write(data);
    if (!result) {
      return new Promise((resolve) => this.stream.once('drain', resolve));
    }
    this.stream.end();
    return Promise.resolve();
  }
}
