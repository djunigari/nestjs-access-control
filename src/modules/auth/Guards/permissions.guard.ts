import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from 'src/modules/permissions/entities/permission.enum';
import { FindAllPermissionsByRoleNamesService } from 'src/modules/roles/services/FindAllPermissionsByRoleNames.service';
import { PERMISSIONS_KEY } from './permissions.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private service: FindAllPermissionsByRoleNamesService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const requiredPermissions = this.reflector.getAllAndOverride<Permission[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermissions) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    if (!user) {
      return false;
    }

    const result = await this.service.execute(user.roles);
    const permissions = result.map((permission) => permission.name);
    console.log(permissions);
    return requiredPermissions.some((permission) =>
      permissions.includes(permission),
    );
  }
}
