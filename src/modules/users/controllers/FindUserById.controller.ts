import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FindUserByIdService } from '../services/FindUserById.service';

@Controller()
export class FindUserByIdController {
  constructor(private readonly service: FindUserByIdService) {}

  @Get('user/:id')
  @HttpCode(HttpStatus.FOUND)
  async handle(@Param('id') id: string, @Res() res: Response) {
    const result = await this.service.execute(id);
    if (!result) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
    return res.json(result);
  }
}
