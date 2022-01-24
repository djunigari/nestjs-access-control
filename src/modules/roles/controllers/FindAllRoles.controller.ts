import { Controller, Get, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { FindAllRolesService } from '../services/FindAllRole.service';

@Controller()
export class FindAllRolesController {
  constructor(private readonly service: FindAllRolesService) {}

  @Get('roles')
  @HttpCode(HttpStatus.FOUND)
  async handle(@Res() res: Response) {
    const result = await this.service.execute();
    if (result instanceof Error) {
      return res.status(HttpStatus.BAD_REQUEST).json(result.message);
    }
    return res.json(result);
  }
}
