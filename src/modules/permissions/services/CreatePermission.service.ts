import { Injectable } from '@nestjs/common';
import { ICreatePermissionDto } from '../dto/create-permission.dto';
import { Permission } from '../entities/permission.entity';
import { BasePermissionService } from './BasePermission.service';

@Injectable()
export class CreatePermissionService extends BasePermissionService {
  async execute({
    name,
    description,
  }: ICreatePermissionDto): Promise<Permission | Error> {
    if (await this.repo().findOne({ name })) {
      return new Error('Permission already exists');
    }

    const permission = this.repo().create({ name, description });

    await this.repo().save(permission);

    return permission;
  }
}
