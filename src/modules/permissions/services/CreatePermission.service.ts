import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICreatePermissionDto } from '../dto/create-permission.dto';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class CreatePermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async execute({
    name,
    description,
  }: ICreatePermissionDto): Promise<Permission | Error> {
    if (await this.permissionsRepository.findOne({ name })) {
      return new Error('Permission already exists');
    }

    const permission = this.permissionsRepository.create({ name, description });

    await this.permissionsRepository.save(permission);

    return permission;
  }
}
