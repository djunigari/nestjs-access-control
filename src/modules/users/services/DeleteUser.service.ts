import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { BaseUserService } from './BaseUser.service';

@Injectable()
export class DeleteUserService extends BaseUserService {
  async execute(id: string): Promise<DeleteResult | Error> {
    return await this.repo().delete(id);
  }
}
