import { Command } from './command.interface.js';
import { generateFakeOffersData } from '../../service/index.js';

export class GenerateCommand implements Command {
  public getName(): string {
    return '--generate';
  }

  public execute(data: string[]): void {
    const number = parseInt(data[0], 10);
    const fileName = data[1];
    generateFakeOffersData(number, fileName);
  }
}
