import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreatePermissionService } from './CreatePermission.service';

interface ICreatePermissionDto {
  name: string;
  description: string;
}

@Controller()
export class CreatePermissionController {
  constructor(
    private readonly createPermissionService: CreatePermissionService,
  ) {}

  @Post('/permissions')
  @HttpCode(HttpStatus.CREATED)
  async handle(
    @Body() { name, description }: ICreatePermissionDto,
    @Res() res: Response,
  ) {
    const result = await this.createPermissionService.execute({
      name,
      description,
    });

    if (result instanceof Error) {
      return res.status(HttpStatus.BAD_REQUEST).json(result.message);
    }

    return res.json(result);
  }
}
