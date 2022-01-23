import { Controller, Post } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreatePermissionService } from './CreatePermission.service';

@Controller()
export class CreatePermissionController {
  constructor(
    private readonly createPermissionService: CreatePermissionService,
  ) {}

  @Post('/permissions')
  async handle(request: Request, response: Response) {
    const { name, description } = request.body;

    const result = await this.createPermissionService.execute({
      name,
      description,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
