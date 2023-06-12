import { IsNotEmpty, IsString } from 'class-validator';
import { IAuthRequest } from '../interfaces/auth-request.interface';

export class AuthRequestDTO implements IAuthRequest {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
