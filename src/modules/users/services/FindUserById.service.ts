import { Injectable } from '@nestjs/common';
import { User } from '../entities/User.entity';
import { BaseUserService } from './BaseUser.service';

@Injectable()
export class FindUserByIdService extends BaseUserService {
  async execute(id: string): Promise<User | Error> {
    return await this.repo().findOne(id);
  }
}
