import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../../user/service/user.service';
import { IAuthRequest, IAuthResponse } from '../interfaces';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async authenticate({
    email,
    password,
  }: IAuthRequest): Promise<IAuthResponse> {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    if (!(await user.validPassword(password))) {
      throw new BadRequestException('Invalid password');
    }

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    const response: IAuthResponse = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    };

    return response;
  }
}
