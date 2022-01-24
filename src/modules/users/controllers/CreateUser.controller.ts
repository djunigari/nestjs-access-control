import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ICreateUserDto } from '../dto/create-user.dto';
import { CreateUserService } from '../services/CreateUser.service';

@Controller()
export class CreateUserController {
  constructor(private readonly service: CreateUserService) {}

  @Post('user')
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() createUserDto: ICreateUserDto, @Res() res: Response) {
    const result = await this.service.execute(createUserDto);
    if (result instanceof Error) {
      return res.status(HttpStatus.BAD_REQUEST).json(result.message);
    }
    return res.json(result);
  }
}
