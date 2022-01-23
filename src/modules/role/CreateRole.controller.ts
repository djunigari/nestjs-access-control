import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateRoleService } from './CreateRole.service';

interface ICreateRoleDto {
  name: string;
  description: string;
}

@Controller()
export class CreateRoleController {
  constructor(private readonly createRoleService: CreateRoleService) {}

  @Post('/roles')
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body() { name, description }: ICreateRoleDto,
    @Res() res: Response,
  ) {
    const result = await this.createRoleService.execute({ name, description });

    if (result instanceof Error) {
      return res.status(HttpStatus.BAD_REQUEST).json(result.message);
    }

    return res.json(result);
  }
}
