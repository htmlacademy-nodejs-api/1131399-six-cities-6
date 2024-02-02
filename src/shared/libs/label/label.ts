import { injectable } from 'inversify';
import { ILabel } from './label.interface.js';
import { labels } from './labels.js';

@injectable()
export class Label implements ILabel {
  private readonly labels: Record<string, string> = Object.assign({}, labels);
  constructor() {}

  public get (key: string) {
    if (this.labels[key]) {
      return this.labels[key];
    }
    return this.labels.noTranslation;
  }

  public getAll () {
    return this.labels;
  };

}
