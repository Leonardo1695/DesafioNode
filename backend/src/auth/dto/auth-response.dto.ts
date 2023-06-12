import { IUser } from 'src/user/interface/user.interface';
import { IAuthResponse } from '../interfaces/auth-response.interface';
import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class AuthResponseDTO implements IAuthResponse {
  @IsNotEmpty()
  @IsString()
  user: IUser;

  @IsNotEmpty()
  @IsString()
  @IsJWT()
  token: string;
}
