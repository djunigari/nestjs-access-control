import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { RequirePermissions } from 'src/modules/auth/Guards/permissions.decorator';
import { Permission } from 'src/modules/permissions/entities/permission.enum';
import { FindAllRolesService } from '../services/FindAllRole.service';

@Controller()
export class FindAllRolesController {
  constructor(private readonly service: FindAllRolesService) {}

  @Get('roles')
  @RequirePermissions(Permission.READ_ROLE)
  @HttpCode(HttpStatus.FOUND)
  async handle(@Res() res: Response) {
    const result = await this.service.execute();
    if (result instanceof Error) {
      return res.status(HttpStatus.BAD_REQUEST).json(result.message);
    }
    return res.json(result);
  }
}
