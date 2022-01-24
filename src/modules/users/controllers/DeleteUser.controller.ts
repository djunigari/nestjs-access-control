import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { DeleteUserService } from '../services/DeleteUser.service';

@Controller()
export class DeleteUserController {
  constructor(private readonly service: DeleteUserService) {}

  @Delete('user/:id')
  @HttpCode(HttpStatus.OK)
  async execute(@Param('id') id: string, @Res() res: Response) {
    const result = await this.service.execute(id);
    return res.json(result);
  }
}
