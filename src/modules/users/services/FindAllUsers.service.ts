import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { BaseUserService } from './BaseUser.service';

@Injectable()
export class FindAllUsersService extends BaseUserService {
  async execute(): Promise<User[] | Error> {
    return await this.repo().find();
  }
}
