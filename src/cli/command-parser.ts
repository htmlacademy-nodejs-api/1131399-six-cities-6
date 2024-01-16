import { Commands } from '../constants/enums.js';
type ParsedCommand = {
  name: string | null;
  args: string[] | null;
};

export class CommandParser {
  static parse(args: string[]): ParsedCommand {
    const parsedCommand: ParsedCommand = {
      name: null,
      args: null
    };
    const [,,currentCommand, ...rest] = args;
    if (Object.values(Commands).includes(currentCommand)) {
      parsedCommand.name = currentCommand;
      parsedCommand.args = rest;
    }
    return parsedCommand;
  }
}
