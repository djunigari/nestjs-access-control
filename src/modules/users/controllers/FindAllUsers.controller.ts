import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { FindAllUsersService } from '../services/FindAllUsers.service';

@Controller()
export class FindAllUsersController {
  constructor(private readonly service: FindAllUsersService) {}

  @Get('users')
  async handle(@Res() res: Response) {
    const result = await this.service.execute();
    if (result instanceof Error) {
      return res.status(HttpStatus.BAD_REQUEST).json(result.message);
    }
    return res.json(result);
  }
}
