import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class LoginController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async handler(@Request() { user }) {
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() { user }) {
    return user;
  }
}
