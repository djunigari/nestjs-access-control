import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import {
  PERMISSION_CHECKER_KEY,
  RequiredPermission,
} from './permissions.decorator';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private abilityFactory: CaslAbilityFactory,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const noAuth = this.reflector.get<boolean>('no-auth', context.getHandler());
    if (noAuth) {
      return true;
    }
    const requiredPermissions =
      this.reflector.get<RequiredPermission[]>(
        PERMISSION_CHECKER_KEY,
        context.getHandler(),
      ) || [];
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    const ability = await this.abilityFactory.createForUser(user);
    return requiredPermissions.every((rule) => ability.can(...rule));
  }
}
