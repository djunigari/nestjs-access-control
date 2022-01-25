import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { RequirePermissions } from 'src/modules/auth/Guards/permissions.decorator';
import { Permission } from 'src/modules/permissions/entities/permission.enum';
import { IUpdateRoleDto } from '../dto/update-role.dto';
import { UpdateRoleService } from '../services/UpdateRole.service';

@Controller()
export class UpdateRoleController {
  constructor(private readonly service: UpdateRoleService) {}

  @Patch('role/:id')
  @RequirePermissions(Permission.EDIT_ROLE)
  @HttpCode(HttpStatus.CREATED)
  async execute(
    @Param('id') id: string,
    @Body() updateRoleDto: IUpdateRoleDto,
    @Res() res: Response,
  ) {
    const result = await this.service.execute(id, updateRoleDto);
    if (result instanceof Error) {
      return res.status(HttpStatus.BAD_REQUEST).json(result.message);
    }
    return res.json(result);
  }
}
