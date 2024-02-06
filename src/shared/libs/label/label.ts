import _ from 'lodash';
import { injectable } from 'inversify';
import { ILabel } from './label.interface.js';
import { labels as labelsConfig } from './labels.js';
import type { labelType } from './labels.js';

@injectable()
export class Label implements ILabel {
  private readonly labels = Object.assign({}, labelsConfig);
  constructor() {}

  public get (key: keyof labelType): string {
    return _.get(this.labels, key, this.labels.common.noTranslation) as string;
  }

  public getAll () {
    return this.labels;
  }

}
