import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/Role.entity';
import { Repository } from 'typeorm';

type RoleRequest = {
  name: string;
  description: string;
};

@Injectable()
export class CreateRoleService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) {}

  async execute({ name, description }: RoleRequest): Promise<Role | Error> {
    if (await this.rolesRepository.findOne({ name })) {
      return new Error('Role already exists');
    }

    const role = this.rolesRepository.create({ name, description });

    await this.rolesRepository.save(role);

    return role;
  }
}
