import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class FindPermissionByIdService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async execute(permissionId: string): Promise<Permission | Error> {
    return await this.permissionsRepository.findOne(permissionId);
  }
}
