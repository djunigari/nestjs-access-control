import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/Role.entity';
import { Repository } from 'typeorm';
import { Permission } from '../permissions/entities/permission.entity';

type RolePermissionRequest = {
  roleId: string;
  permissions: string[];
};

@Injectable()
export class CreateRolePermissionService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async execute({
    roleId,
    permissions,
  }: RolePermissionRequest): Promise<Role | Error> {
    const role = await this.rolesRepository.findOne(roleId);

    if (!role) {
      return new Error('Role does not exists!');
    }

    const permissionsExists = await this.permissionsRepository.findByIds(
      permissions,
    );

    role.permissions = permissionsExists;

    await this.rolesRepository.save(role);

    return role;
  }
}
