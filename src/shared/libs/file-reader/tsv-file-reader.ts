import { IFileReader } from "./file-reader.interface.js";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export class TSVFileReader implements IFileReader {
  private rawData: string[] = [];

  public read(paths: string[]): TSVFileReader {
    paths.forEach((path) => {
      try {
        const content = readFileSync(resolve(path), 'utf-8');
        if (content) {
          this.rawData.push(content);
        }
      } catch (er) {
        console.error(`Error reading file at path: ${path}`);
      }
    });
    return this;
  }

  public toArray(): string[][] {
    const parsedData = this.rawData.map((i) => i.split('\n').filter((s) => !!s.trim()).map((ii) => ii.split('\t'))).flat()
    return parsedData as string[][];
  }
}
