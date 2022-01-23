import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateRolePermissionService } from './CreateRolePermission.service';

interface IRolePermissionDto {
  permissions: [];
}

@Controller()
export class CreateRolePermissionController {
  constructor(
    private readonly createRolePermissionService: CreateRolePermissionService,
  ) {}

  @Post('/roles/:roleId')
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Param('roleId') roleId: string,
    @Body() { permissions }: IRolePermissionDto,
    @Res() res: Response,
  ) {
    const result = await this.createRolePermissionService.execute({
      roleId,
      permissions,
    });

    if (result instanceof Error) {
      return res.status(HttpStatus.BAD_REQUEST).json(result.message);
    }

    return res.json(result);
  }
}
