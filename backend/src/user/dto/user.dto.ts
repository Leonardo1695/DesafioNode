import { IsNotEmpty, IsString } from 'class-validator';
import { IUser } from '../interface/user.interface';

export class UserDTO implements IUser {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
