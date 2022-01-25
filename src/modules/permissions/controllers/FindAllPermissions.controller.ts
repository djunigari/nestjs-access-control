import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { RequirePermissions } from 'src/modules/auth/Guards/permissions.decorator';
import { Permission } from '../entities/permission.enum';
import { FindAllPermissionsService } from '../services/FindAllPermissions.service';

@Controller()
export class FindAllPermissionsController {
  constructor(private readonly service: FindAllPermissionsService) {}

  @Get('permissions')
  @RequirePermissions(Permission.READ_PERMISSION)
  @HttpCode(HttpStatus.FOUND)
  async handle(@Res() res: Response) {
    const result = await this.service.execute();
    if (result instanceof Error) {
      return res.status(HttpStatus.BAD_REQUEST).json(result.message);
    }
    return res.json(result);
  }
}
