import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Repository } from 'typeorm';
import { Permission } from '../../permissions/entities/permission.entity';
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

    const permissionsExists = await this.permissionRepo().findByIds(
      permissions,
    );

    role.permissions = permissionsExists;

    await this.repo().save(role);

    return role;
  }
}
