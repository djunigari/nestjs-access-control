import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { ICreateRoleDto } from '../dto/create-role.dto';
import { CreateRoleService } from '../services/CreateRole.service';

@Controller()
export class CreateRoleController {
  constructor(private readonly service: CreateRoleService) {}

  @Post('role')
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() createRoleDto: ICreateRoleDto, @Res() res: Response) {
    const result = await this.service.execute(createRoleDto);
    if (result instanceof Error) {
      return res.status(HttpStatus.BAD_REQUEST).json(result.message);
    }
    return res.json(result);
  }
}
