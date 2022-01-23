import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities/Permission.entity';
import { Role } from 'src/entities/Role.entity';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';

type UserACLRequest = {
  userId: string;
  roles: string[];
  permissions: string[];
};

@Injectable()
export class CreateUserAccessControlListService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
  ) {}

  async execute({
    userId,
    roles,
    permissions,
  }: UserACLRequest): Promise<User | Error> {
    const user = await this.usersRepository.findOne(userId);

    if (!user) {
      return new Error('User does not exists!');
    }

    const permissionsExists = await this.permissionsRepository.findByIds(
      permissions,
    );

    const rolesExists = await this.rolesRepository.findByIds(roles);

    user.permissions = permissionsExists;
    user.roles = rolesExists;

    await this.usersRepository.save(user);

    return user;
  }
}
