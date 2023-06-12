export interface UserFilter {
  name: string;
  email: string;
  status: 'A' | 'I' | 'P' | '';
  page: number;
  itemsPerPage: number;
}

export type UserStatus = 'A' | 'I' | 'P';

export interface IUser {
  id: string;
  name: string;
  email: string;
}
