import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/User.entity';
import { Role } from 'src/modules/roles/entities/role.entity';
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
  ) {}

  async execute({ userId, roles }: UserACLRequest): Promise<User | Error> {
    const user = await this.usersRepository.findOne(userId);

    if (!user) {
      return new Error('User does not exists!');
    }

    const rolesExists = await this.rolesRepository.findByIds(roles);

    user.roles = rolesExists;

    await this.usersRepository.save(user);

    return user;
  }
}
