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
import { Permission } from 'src/modules/permissions/entities/permission.enum';
import { FindRoleByIdService } from '../services/FindRoleById.service';

@Controller()
export class FindRoleByIdController {
  constructor(private readonly service: FindRoleByIdService) {}

  @Get('role/:id')
  @RequirePermissions(Permission.READ_ROLE)
  @HttpCode(HttpStatus.FOUND)
  async handle(@Param('id') id: string, @Res() res: Response) {
    const result = await this.service.execute(id);
    if (!result) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
    return res.json(result);
  }
}
