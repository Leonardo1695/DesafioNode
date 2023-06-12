import { IUser } from 'src/user/interface/user.interface';

export interface IAuthResponse {
  user: IUser;
  token: string;
}
