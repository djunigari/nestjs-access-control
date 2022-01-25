import { Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { BaseRoleService } from './BaseRole.service';

@Injectable()
export class FindAllPermissionsByRoleNamesService extends BaseRoleService {
  async execute(roles: string[]) {
    const roleList = await this.repo().find({
      where: { name: In(roles) },
      relations: ['permissions'],
    });
    return roleList
      .map((role) => role.permissions)
      .reduce((permissions, permission) => permissions.concat(permission));
  }
}
