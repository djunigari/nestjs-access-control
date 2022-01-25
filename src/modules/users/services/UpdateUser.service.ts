import { Injectable } from '@nestjs/common';
import { IUpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';
import { BaseUserService } from './BaseUser.service';

@Injectable()
export class UpdateUserService extends BaseUserService {
  async execute(
    userId: string,
    { username, password }: IUpdateUserDto,
  ): Promise<User | Error> {
    const User = await this.repo().findOne(userId);

    if (!User) {
      return new Error('User not exists');
    }

    return await this.repo().save({
      id: userId,
      username,
      password,
    });
  }
}
