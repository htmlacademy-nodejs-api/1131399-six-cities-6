import { Command } from './commands/command.interface.js';
import { Commands } from '../constants/enums.js';
import { CommandParser } from './command-parser.js';

type CommandsCollection = Record<string, Command>;

export class CLIApplication {
  private commands: CommandsCollection = {};

  constructor(
    private readonly defaultCommand: string = Commands.Help
  ){}

  public register(list: Command[]): void {
    list.forEach((item) => {
      if (this.commands[item.getName()]) {
        throw new Error(`Command ${item.getName()} is already registered`);
      }
      this.commands[item.getName()] = item;
    });
  }

  public getCommand(commandName: string): Command | never {
    if (this.commands[commandName]) {
      return this.commands[commandName];
    }
    if (this.commands[this.defaultCommand]) {
      return this.commands[this.defaultCommand];
    }
    throw new Error(`
      The command ${commandName} is not registered.
      The default command ${this.defaultCommand} is not registered
    `);
  }

  public processCommand(args: string[]): void {
    const parsedCommand = CommandParser.parse(args);
    const currentCommand = this.getCommand(parsedCommand.name || '');
    currentCommand.execute(parsedCommand.args || []);

  }
}
