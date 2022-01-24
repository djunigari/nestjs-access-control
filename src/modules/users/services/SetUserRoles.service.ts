import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/modules/roles/entities/role.entity';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { BaseUserService } from './BaseUser.service';

type UserACLRequest = {
  userId: string;
  roles: string[];
};

@Injectable()
export class SetUserRolesService extends BaseUserService {
  async execute({ userId, roles }: UserACLRequest): Promise<User | Error> {
    const user = await this.repo().findOne(userId);

    if (!user) {
      return new Error('User does not exists!');
    }

    if (roles) {
      const rolesExists = await this.roleRepo().findByIds(roles);
      user.roles = rolesExists;
    } else {
      user.roles = [];
    }

    await this.repo().save(user);

    return user;
  }
}
