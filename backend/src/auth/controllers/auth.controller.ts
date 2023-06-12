import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponseDTO } from '../dto/auth-response.dto';
import { AuthService } from '../services/auth.service';
import { AuthRequestDTO } from '../dto/auth-request.dto';
import { Public } from '../decorators/public-route.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('authenticate')
  signIn(@Body() data: AuthRequestDTO): Promise<AuthResponseDTO> {
    return this.authService.authenticate(data);
  }
}
