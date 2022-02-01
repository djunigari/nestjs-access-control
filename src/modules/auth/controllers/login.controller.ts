import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  ForbiddenException,
} from '@nestjs/common';
import { LoginService } from '../services/Login.service';
import { LocalAuthGuard } from '../Guards/local-auth.guard';
import { Action } from 'src/modules/permissions/entities/actions.enum';
import { NoAuth } from '../Guards/noauth.decorator';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { User } from 'src/modules/users/entities/user.entity';

@Controller()
export class LoginController {
  constructor(
    private loginService: LoginService,
    private readonly caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @UseGuards(LocalAuthGuard)
  @NoAuth()
  @Post('auth/login')
  async handler(@Request() { user }) {
    return this.loginService.execute(user);
  }

  @Get('profile')
  async getProfile(@Request() { user }) {
    const ability = await this.caslAbilityFactory.createForUser(user);
    if (!ability.can(Action.READ, user)) {
      throw new ForbiddenException('You dont have access to this resource!');
    }
    return user;
  }
}
