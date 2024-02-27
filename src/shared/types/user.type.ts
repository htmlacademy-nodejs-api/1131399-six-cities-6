
export enum UserType {
  standard = 'standard',
  pro = 'pro'
}

export type User = {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  type: UserType.standard | UserType.pro;
  selected: string[];
  token?: string | null;
}

