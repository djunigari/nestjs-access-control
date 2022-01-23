import { Controller, Post } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateRolePermissionService } from './CreateRolePermission.service';

@Controller()
export class CreateRolePermissionController {
  constructor(
    private readonly createRolePermissionService: CreateRolePermissionService,
  ) {}

  @Post('/roles/:roleId')
  async handle(request: Request, response: Response) {
    const { roleId } = request.params;
    const { permissions } = request.body;

    const result = await this.createRolePermissionService.execute({
      roleId,
      permissions,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
