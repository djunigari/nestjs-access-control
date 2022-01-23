import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateRoleService } from './CreateRole.service';

interface ICreateRoleDto {
  name: string;
  description: string;
}
@Controller()
export class CreateRoleController {
  constructor(private readonly createRoleService: CreateRoleService) {}

  @Post('/roles')
  async handle(
    @Body() { name, description }: ICreateRoleDto,
    @Res() res: Response,
  ) {
    const result = await this.createRoleService.execute({ name, description });

    if (result instanceof Error) {
      return res.status(HttpStatus.BAD_REQUEST).json(result.message);
    }
    return res.status(HttpStatus.CREATED).json(result);
  }
}
