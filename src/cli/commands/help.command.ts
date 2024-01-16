import chalk from 'chalk';
import { Command } from "./command.interface.js";

export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public execute(): void {
    const info = chalk.italic.magenta;
    console.info(info(`
      Программа для подготовки данных для REST Api сервера.
      Пример:
        dist/main.cli.js --<command> [--arguments]

      Комманды:
        --version                 # выводит номер версии
        --help                    # выводит данный текст
        --import <path>           # импортирует данные из файла в формате .tsv, расположенного в path
    `));
  }
}
