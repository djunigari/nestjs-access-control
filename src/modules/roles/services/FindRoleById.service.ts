import { Injectable } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { BaseRoleService } from './BaseRole.service';

@Injectable()
export class FindRoleByIdService extends BaseRoleService {
  async execute(id: string): Promise<Role | Error> {
    return await this.repo().findOne({
      where: { id },
      relations: ['permissions'],
    });
  }
}
