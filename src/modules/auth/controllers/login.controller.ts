import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LoginService } from '../services/Login.service';
import { LocalAuthGuard } from '../Guards/local-auth.guard';
import { CheckPermissions } from '../Guards/permissions.decorator';
import { Action } from 'src/modules/permissions/entities/actions.enum';
import { Subject } from 'src/modules/permissions/entities/subjects.enum';
import { NoAuth } from '../Guards/noauth.decorator';

@Controller()
export class LoginController {
  constructor(private loginService: LoginService) {}

  @UseGuards(LocalAuthGuard)
  @NoAuth()
  @Post('auth/login')
  async handler(@Request() { user }) {
    return this.loginService.execute(user);
  }

  @Get('profile')
  @CheckPermissions([Action.CREATE, Subject.USER])
  getProfile(@Request() { user }) {
    return user;
  }
}
