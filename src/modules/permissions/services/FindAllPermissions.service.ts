import { Injectable } from '@nestjs/common';
import { Permission } from '../entities/permission.entity';
import { BasePermissionService } from './BasePermission.service';

@Injectable()
export class FindAllPermissionsService extends BasePermissionService {
  async execute(): Promise<Permission[] | Error> {
    return await this.repo().find();
  }
}
