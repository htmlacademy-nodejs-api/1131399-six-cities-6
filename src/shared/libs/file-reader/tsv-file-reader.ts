import { IFileReader } from "./file-reader.interface.js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { Offer } from "../../../constants/types.js";

export class TSVFileReader implements IFileReader {
  private rawData: string[] = [];

  public read(paths: string[]): void {
    paths.forEach((path) => {
      try {
        const content = readFileSync(resolve(path), 'utf-8');
        if (content) {
          this.rawData.push(content);
        }
      } catch (er) {
        console.error(`Error reading file at path: ${path}`);
      }
    })
  }

  public toArray(): Offer {
    return {} as Offer;
  }
}
