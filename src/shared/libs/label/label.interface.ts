import { labelType } from './labels.js';

type GetLabel = (key: keyof labelType) => string;
type GetAll = () => labelType;

export interface ILabel {
  get: GetLabel;
  getAll: GetAll;
}
