import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserService } from './CreateUser.service';

interface ICreateUserDto {
  username: string;
  password: string;
}

@Controller()
export class CreateUserController {
  constructor(private readonly createUserService: CreateUserService) {}

  @Post('users')
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body() { username, password }: ICreateUserDto,
    @Res() res: Response,
  ) {
    const result = await this.createUserService.execute({ username, password });

    if (result instanceof Error) {
      return res.status(HttpStatus.BAD_REQUEST).json(result.message);
    }

    return res.json(result);
  }
}
