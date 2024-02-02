type GetLabel = (key: string) => string;
type GetAll = () => Record<string, string>;

export interface ILabel {
  get: GetLabel;
  getAll: GetAll;
}
