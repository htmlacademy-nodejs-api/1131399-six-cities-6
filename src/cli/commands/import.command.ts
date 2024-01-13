// import { readFileSync } from "node:fs";
import { Command } from "./command.interface.js";
// import { resolve } from "node:path";


export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  public execute(filePaths: string[]): void {
    console.log(filePaths);
  }
}
