import { readFileSync } from 'node:fs';
import { Command } from './command.interface.js';
import { resolve } from 'node:path';
import chalk from 'chalk';

type ObjectWithVersion = {
  version: string;
}

export class VersionCommand implements Command {
  constructor(
    private readonly filePath: string = './package.json'
  ){}

  private hasVersionField(data: unknown): boolean {
    if (!data || Array.isArray(data) || typeof data !== 'object') {
      return false;
    }
    return Object.hasOwn(data, 'version');
  }

  private readVersion() {
    const content = readFileSync(resolve(this.filePath), 'utf-8');
    const parsedContent: unknown = JSON.parse(content);
    if (this.hasVersionField(parsedContent)) {
      return (parsedContent as ObjectWithVersion).version;
    } else {
      throw new Error('There is no version in the file provided');
    }
  }

  public getName(): string {
    return '--version';
  }

  public execute(): void {
    const versionStyle = chalk.italic.yellowBright;
    const versionNumberStyle = chalk.bold.italic.yellowBright;
    console.info(`${versionStyle('version:')} ${versionNumberStyle(this.readVersion())}`);
  }
}
