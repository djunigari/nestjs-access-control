import { Injectable } from '@nestjs/common';
import { ICreateRoleDto } from '../dto/create-role.dto';
import { Role } from '../entities/role.entity';
import { BaseRoleService } from './BaseRole.service';

@Injectable()
export class CreateRoleService extends BaseRoleService {
  async execute({ name, description }: ICreateRoleDto): Promise<Role | Error> {
    if (await this.repo().findOne({ name })) {
      return new Error('Role already exists');
    }

    const role = this.repo().create({ name, description });

    await this.repo().save(role);

    return role;
  }
}
