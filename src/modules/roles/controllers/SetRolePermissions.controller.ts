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
import { RequirePermissions } from 'src/modules/auth/Guards/permissions.decorator';
import { Permission } from 'src/modules/permissions/entities/permission.enum';
import { IRolePermissionDto } from '../dto/create-role-permission.dto';
import { SetRolePermissionsService } from '../services/SetRolePermissions.service';

@Controller()
export class SetRolePermissionsController {
  constructor(
    private readonly createRolePermissionService: SetRolePermissionsService,
  ) {}

  @Post('/role/:roleId/permissions')
  @RequirePermissions(Permission.EDIT_ROLE)
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
