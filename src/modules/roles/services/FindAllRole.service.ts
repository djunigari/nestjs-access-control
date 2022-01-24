import { Injectable } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { BaseRoleService } from './BaseRole.service';

@Injectable()
export class FindAllRolesService extends BaseRoleService {
  async execute(): Promise<Role[] | Error> {
    return await this.repo().find();
  }
}
