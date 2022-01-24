import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { BaseRoleService } from './BaseRole.service';

@Injectable()
export class DeleteRoleService extends BaseRoleService {
  async execute(id: string): Promise<DeleteResult | Error> {
    return await this.repo().delete(id);
  }
}
