import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { Permission } from 'src/modules/permissions/entities/permission.enum';
import { RequirePermissions } from '../Guards/permissions.decorator';
import { LoginService } from '../services/Login.service';
import { JwtAuthGuard } from '../Guards/jwt-auth.guard';
import { LocalAuthGuard } from '../Guards/local-auth.guard';

@Controller()
export class LoginController {
  constructor(private loginService: LoginService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async handler(@Request() { user }) {
    return this.loginService.execute(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @RequirePermissions(Permission.READ_USER)
  getProfile(@Request() { user }) {
    return user;
  }
}
