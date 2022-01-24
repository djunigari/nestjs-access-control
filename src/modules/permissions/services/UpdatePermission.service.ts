import { Injectable } from '@nestjs/common';
import { IUpdatePermissionDto } from '../dto/update-permission.dto';
import { Permission } from '../entities/permission.entity';
import { BasePermissionService } from './BasePermission.service';

@Injectable()
export class UpdatePermissionService extends BasePermissionService {
  async execute(
    permissionId: string,
    { name, description }: IUpdatePermissionDto,
  ): Promise<Permission | Error> {
    const permission = await this.repo().findOne(permissionId);

    if (!permission) {
      return new Error('Permission not exists');
    }

    return await this.repo().save({
      id: permissionId,
      name,
      description,
    });
  }
}
