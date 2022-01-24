import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FindRoleByIdService } from '../services/FindRoleById.service';

@Controller()
export class FindRoleByIdController {
  constructor(private readonly service: FindRoleByIdService) {}

  @Get('role/:id')
  @HttpCode(HttpStatus.FOUND)
  async handle(@Param('id') id: string, @Res() res: Response) {
    const result = await this.service.execute(id);
    if (!result) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
    return res.json(result);
  }
}
