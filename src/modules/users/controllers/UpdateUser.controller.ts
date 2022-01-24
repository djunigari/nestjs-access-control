import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { IUpdateUserDto } from '../dto/update-user.dto';
import { UpdateUserService } from '../services/UpdateUser.service';

@Controller()
export class UpdateUserController {
  constructor(private readonly service: UpdateUserService) {}

  @Patch('user/:id')
  @HttpCode(HttpStatus.CREATED)
  async execute(
    @Param('id') id: string,
    @Body() updateUserDto: IUpdateUserDto,
    @Res() res: Response,
  ) {
    const result = await this.service.execute(id, updateUserDto);
    if (result instanceof Error) {
      return res.status(HttpStatus.BAD_REQUEST).json(result.message);
    }
    return res.json(result);
  }
}
