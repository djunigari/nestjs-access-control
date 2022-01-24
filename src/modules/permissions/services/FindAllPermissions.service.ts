import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class FindAllPermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async execute(): Promise<Permission[] | Error> {
    const permissions = this.permissionsRepository.find();

    return permissions;
  }
}
