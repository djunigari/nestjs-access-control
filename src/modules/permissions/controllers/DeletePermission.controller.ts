import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { RequirePermissions } from 'src/modules/auth/Guards/permissions.decorator';
import { Permission } from '../entities/permission.enum';
import { DeletePermissionService } from '../services/DeletePermission.service';

@Controller()
export class DeletePermissionController {
  constructor(private readonly service: DeletePermissionService) {}

  @Delete('permission/:id')
  @RequirePermissions(Permission.DELETE_PERMISSION)
  @HttpCode(HttpStatus.OK)
  async execute(@Param('id') id: string, @Res() res: Response) {
    const result = await this.service.execute(id);
    return res.json(result);
  }
}
