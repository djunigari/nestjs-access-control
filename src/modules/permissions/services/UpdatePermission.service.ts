import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IUpdatePermissionDto } from '../dto/update-permission.dto';
import { Permission } from '../entities/permission.entity';

@Injectable()
export class UpdatePermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async execute(
    permissionId: string,
    { name, description }: IUpdatePermissionDto,
  ): Promise<Permission | Error> {
    const permission = await this.permissionsRepository.findOne(permissionId);

    if (!permission) {
      return new Error('Permission not exists');
    }

    return await this.permissionsRepository.save({
      id: permissionId,
      name,
      description,
    });
  }
}
