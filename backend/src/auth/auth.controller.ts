import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dtos/login-credentials.dto';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() credentials: Partial<User>) {
    return this.authService.register(credentials);
  }

  @Post('login')
  async login(@Body() loginCredentials: LoginCredentialsDto) {
    return this.authService.login(loginCredentials);
  }
}
