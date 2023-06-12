import { Controller, Get } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { UserDTO } from '../dto/user.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  getAllUsers(): Promise<UserDTO[]> {
    return this.userService.findAll();
  }
}
