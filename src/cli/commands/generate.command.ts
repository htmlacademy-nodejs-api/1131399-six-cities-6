import chalk from 'chalk';
import path from 'node:path';
import fs from 'node:fs';
import { Command } from './command.interface.js';
import { getFakeOffersString } from '../../service/index.js';

export class GenerateCommand implements Command {
  public getName(): string {
    return '--generate';
  }

  public execute(data: string[]): void {
    const info = chalk.italic.magenta;
    const number = parseInt(data[0], 10);
    const fileName = data[1];

    console.info(info(number), fileName);
    getFakeOffersString(number).then((data) => {
      console.log(data);
      const filePath = path.resolve('mocks', fileName);
      fs.writeFileSync(filePath, data);
    });
  }
}
