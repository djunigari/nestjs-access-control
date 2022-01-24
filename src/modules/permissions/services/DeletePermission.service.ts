import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class DeletePermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async execute(permissionId: string): Promise<DeleteResult | Error> {
    return await this.permissionsRepository.delete(permissionId);
  }
}
