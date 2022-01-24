import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/modules/permissions/entities/permission.entity';
import { Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

@Injectable()
export class BaseRoleService {
  constructor(
    @InjectRepository(Role)
    private repository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  repo(): Repository<Role> {
    return this.repository;
  }

  permissionRepo(): Repository<Permission> {
    return this.permissionsRepository;
  }
}
