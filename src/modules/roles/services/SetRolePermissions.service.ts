import { Injectable } from '@nestjs/common';
import { Role } from 'src/modules/roles/entities/role.entity';
import { BaseRoleService } from './BaseRole.service';

type RolePermissionRequest = {
  roleId: string;
  permissions: string[];
};

@Injectable()
export class SetRolePermissionsService extends BaseRoleService {
  async execute({
    roleId,
    permissions,
  }: RolePermissionRequest): Promise<Role | Error> {
    const role = await this.repo().findOne(roleId);

    if (!role) {
      return new Error('Role does not exists!');
    }

    if (permissions) {
      const permissionsExists = await this.permissionRepo().findByIds(
        permissions,
      );
      role.permissions = permissionsExists;
    } else {
      role.permissions = [];
    }

    await this.repo().save(role);

    return role;
  }
}
