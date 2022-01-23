import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities/Permission.entity';
import { Repository } from 'typeorm';

type PermissionRequest = {
  name: string;
  description: string;
};

@Injectable()
export class CreatePermissionService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async execute({
    name,
    description,
  }: PermissionRequest): Promise<Permission | Error> {
    if (await this.permissionsRepository.findOne({ name })) {
      return new Error('Permission already exists');
    }

    const permission = this.permissionsRepository.create({ name, description });

    await this.permissionsRepository.save(permission);

    return permission;
  }
}
