import { Injectable } from '@nestjs/common';
import { Permission } from 'src/modules/permissions/entities/permission.entity';
import { getManager } from 'typeorm';
import { BaseUserService } from './BaseUser.service';

@Injectable()
export class FindAllPermissionsOfUserByIdService extends BaseUserService {
  async execute(id: string) {
    const permissions: Permission[] = [];
    const result = await getManager()
      .createQueryBuilder('users', 'u')
      .select('p.id,p.action,p.subject')
      .innerJoin('u.roles', 'r')
      .innerJoin('r.permissions', 'p')
      .where('u.id = :id', { id })
      .getRawMany();

    result.map((p) => {
      const permission = new Permission();
      permission.id = p.id;
      permission.action = p.action;
      permission.subject = p.subject;

      permissions.push(permission);
    });

    return permissions;
  }
}
