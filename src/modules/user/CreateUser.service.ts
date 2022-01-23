import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hash } from 'bcryptjs';
import { User } from 'src/entities/User.entity';
import { Repository } from 'typeorm';

type UserRequest = {
  username: string;
  password: string;
};

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async execute({ password, username }: UserRequest): Promise<Error | User> {
    const existUser = await this.usersRepository.findOne({ username });

    if (existUser) {
      return new Error('User already exists');
    }

    const passwordHash = await hash(password, 8);

    const user = this.usersRepository.create({
      username,
      password: passwordHash,
    });

    await this.usersRepository.save(user);

    return user;
  }
}
