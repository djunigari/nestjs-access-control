import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { RequirePermissions } from 'src/modules/auth/Guards/permissions.decorator';
import { Permission } from '../entities/permission.enum';
import { FindPermissionByIdService } from '../services/FindPermissionById.service';

@Controller()
export class FindPermissionByIdController {
  constructor(private readonly service: FindPermissionByIdService) {}

  @Get('permission/:id')
  @RequirePermissions(Permission.READ_PERMISSION)
  @HttpCode(HttpStatus.FOUND)
  async handle(@Param('id') id: string, @Res() res: Response) {
    const result = await this.service.execute(id);
    if (!result) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
    return res.json(result);
  }
}
