import { Injectable } from '@nestjs/common';
import { Permission } from '../entities/permission.entity';
import { BasePermissionService } from './BasePermission.service';

@Injectable()
export class FindPermissionByIdService extends BasePermissionService {
  async execute(id: string): Promise<Permission | Error> {
    return await this.repo().findOne(id);
  }
}
