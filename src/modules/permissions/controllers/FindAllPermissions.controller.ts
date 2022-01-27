import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { FindAllPermissionsService } from '../services/FindAllPermissions.service';

@Controller()
export class FindAllPermissionsController {
  constructor(private readonly service: FindAllPermissionsService) {}

  @Get('permissions')
  @HttpCode(HttpStatus.FOUND)
  async handle(@Res() res: Response) {
    const result = await this.service.execute();
    if (result instanceof Error) {
      return res.status(HttpStatus.BAD_REQUEST).json(result.message);
    }
    return res.json(result);
  }
}
